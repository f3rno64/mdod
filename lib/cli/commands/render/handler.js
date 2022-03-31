const cls = require('colors')
const path = require('path')
const PI = require('p-iteration')
const { getTimer, getLogger } = require('f3rno64-lib')
const { ensurePath, getMdFilesInDirectory } = require('../../../util')
const { getMdSinglePageTemplate } = require('../../../templates')
const renderFile = require('./render_file')

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
 * @param {string} args.recursive - if directories are to be searched for
 *   further renderable files.
 */
const renderCommandHandler = async (args = {}) => {
  const renderTimer = getTimer()
  const template = await getMdSinglePageTemplate()
  const {
    overwrite = false, hidden = true, dest: destPath, src: srcPath, recursive
  } = args

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

  const files = await getMdFilesInDirectory({
    dirPath: srcPath,
    allowHidden: hidden,
    recursive
  })

  const pages = await PI.map(files, file => renderFile({
    srcPath: file,
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
