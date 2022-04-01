const path = require('path')
const cls = require('colors')
const PI = require('p-iteration')
const { getTimer, getLogger } = require('f3rno64-lib')
const deployTemplatePublicDir = require('../../../templates/deploy_template_public_dir')
const { ensurePath, getMdFilesInDirectory } = require('../../../util')
const renderMdFile = require('../../../md/render_md_file')
const getPostTemplate = require('../../../templates/post')
const renderFile = require('./render_file')

const l = getLogger('render')
const templateData = {
  siteName: 'f3rno64\'s blog',
  copyrightYear: 2022,
  stylesheets: [
    '/css/spectre/dist/spectre.min.css/raw',
    '/css/spectre/dist/spectre-icons.css/raw'
  ]
}

/**
 * @typedef RenderableFile
 *
 * @property {string} filePath - path for the source file
 * @property {string} fileDestPath - path for the rendered file
 * @property {string} fileSourceMD - source file markdown content
 * @property {string} fileHTML - rendered file HTML content
 * @property {number} fileRenderDurationMTS - milliseconds to render
 * @property {boolean} fileRendered - true if the destination file was written
 */

/**
 * Renders markdown files to HTML based on passed parameters.
 *
 * @async
 *
 * @param {object} [args={}] - arguments
 * @param {boolean} [args.overwrite=false] - if true, existing files are
 *   overwritten
 * @param {boolean} [args.hidden=true] - if false, hidden files (names starting
 *   with a '.') will not be rendered
 * @param {string} args.dest - destination directory to write HTML output too
 * @param {string} args.src - source path to read markdown files from
 * @param {string} args.recursive - if directories are to be searched for
 *   further renderable files.
 */
const renderCommandHandler = async (args = {}) => {
  const renderTimer = getTimer()
  const {
    overwrite = false, hidden = true, dest: destPath, src: srcPath, recursive
  } = args

  const postTemplate = await getPostTemplate()

  try {
    await ensurePath(srcPath)
  } catch (err) {
    l.error('source path unavailable: %s', err.message)
    return
  }

  try {
    await ensurePath(destPath)
  } catch (err) {
    l.error('destination path unavailable: %s', err.message)
    return
  }

  l.info('rendering files in directory: %s', cls.green(srcPath))

  // Get all markdown files in the source directory
  const files = await getMdFilesInDirectory({
    dirPath: srcPath,
    allowHidden: hidden,
    recursive
  })

  // Render the markdown files to HTML
  const filesMdHTML = await PI.map(files, async file => (
    renderMdFile({ filePath: file })
  ))

  // Construct a set of pages to represent the site at large
  // TODO: These are only posts; add other page types
  const pages = files.map((filePath, index) => ({
    index,
    filePath,
    title: filePath, // TODO: Get from front matter
    url: `/posts/${path.basename(filePath).split('.')[0]}`,
    contentMD: filesMdHTML[index]
  }))

  // Render the pages with the post template
  const { renderer, ...activeTemplateData } = postTemplate
  const renderedPages = await PI.map(files, file => renderFile({
    srcPath: file,
    destPath,
    overwrite,
    renderer,
    templateData: {
      ...templateData,
      ...activeTemplateData,
      pages
    }
  }))

  // Copy over public template files
  // TODO: make template dynamic
  await deployTemplatePublicDir({ destDir: destPath, template: postTemplate })

  l.info(
    'rendered %s/%s pages in %sms',
    cls.cyan(renderedPages.length),
    cls.green(files.length),
    cls.green(renderTimer())
  )
}

module.exports = renderCommandHandler
