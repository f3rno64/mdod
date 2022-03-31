const cls = require('colors')
const PI = require('p-iteration')
const { getTimer, getLogger } = require('f3rno64-lib')
const getMdFilesInDirectory = require('../../../util/fs/get_md_files_in_directory')
const renderFile = require('./render_file')
const { getMdSinglePageTemplate } = require('../../../templates')

const l = getLogger('render')

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
 */
const renderCommandHandler = async (args = {}) => {
  const renderTimer = getTimer()
  const template = await getMdSinglePageTemplate()
  const {
    overwrite = false, hidden = true, dest: destPath, src: srcPath
  } = args

  l.info('serving from: %s', cls.green(srcPath))

  const files = await getMdFilesInDirectory(srcPath, hidden)
  const pages = await PI.map(files, file => renderFile({
    file,
    srcPath,
    destPath,
    overwrite,
    template
  }))

  const fileCount = files.length
  const pageCount = pages.length

  l.info(
    'rendered %s/%s pages in %sms',
    cls.cyan(pageCount),
    cls.green(fileCount),
    cls.green(renderTimer())
  )
}

module.exports = renderCommandHandler
