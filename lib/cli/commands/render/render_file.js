const path = require('path')
const cls = require('colors')
const { promises: fs } = require('fs')
const { getTimer, getLogger } = require('f3rno64-lib')
const mdit = require('../../../md/markdown_it')
const ensurePath = require('../../../util/fs/ensure_path')

const l = getLogger('render:file')

/**
 * Renders a single markdown file to HTML.
 *
 * @async
 *
 * @param {Object} [args={}] - args
 * @param {FSFile} args.file - file to render
 * @param {string} args.srcPath - source path
 * @param {string} args.destPath - destination path
 * @param {boolean} args.overwrite - overwrite existing files
 * @returns {Promise<RenderableFile>} p
 */
const renderFile = async (args = {}) => {
  const { template, file, srcPath, destPath, overwrite } = args
  const pageRenderTimer = getTimer()
  const fileNameNoExt = path.basename(file).split('.')[0]
  const filePath = path.join(srcPath, path.basename(file))
  const fileDestPath = path.join(destPath, `${fileNameNoExt}.html`)

  await ensurePath(filePath)

  const fileSourceMD = await fs.readFile(filePath, 'utf-8')
  const renderable = {
    filePath,
    fileDestPath,
    fileSourceMD,
    fileRendered: false
  }

  try {
    await ensurePath(fileDestPath)

    if (!overwrite) {
      l.info('file exists: %s', cls.green(fileDestPath))

      renderable.fileHTML = await fs.readFile(fileDestPath, 'utf-8')
      renderable.fileRenderDurationMTS = 0
    } else {
      l.warn('overwriting: %s', cls.green(fileDestPath))

      throw new Error('overwrite')
    }
  } catch (_) {
    const fileRenderedHTML = template({
      pageTitle: path.basename(filePath),
      pageContent: mdit.render(fileSourceMD)
    })

    await fs.writeFile(fileDestPath, fileRenderedHTML)

    const fileRenderDurationMTS = pageRenderTimer()

    renderable.fileHTML = fileRenderedHTML
    renderable.fileRenderDurationMTS = fileRenderDurationMTS
    renderable.fileRendered = true

    l.info(
      'rendered in %sms: %s',
      cls.green(fileRenderDurationMTS),
      cls.cyan(fileDestPath)
    )
  }

  return renderable
}

module.exports = renderFile
