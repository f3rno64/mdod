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
  const { template, srcPath, destPath, overwrite } = args
  const pageRenderTimer = getTimer()
  const fileNameNoExt = path.basename(srcPath).split('.')[0]
  const fileRelPath = path.relative(process.cwd(), srcPath)
  const fileDestPath = path.join(destPath, `./${fileRelPath}`, `./${fileNameNoExt}.html`)
  const fileDestDir = path.dirname(fileDestPath)

  try {
    await fs.stat(fileDestDir)
  } catch (_) {
    await fs.mkdir(fileDestDir, { recursive: true })

    l.success('created directory: %s', cls.green(fileDestDir))
  }

  await ensurePath(srcPath)

  let overwritten = false
  const breadcrumbs = path.relative(srcPath, srcPath).split('/')
  const fileSourceMD = await fs.readFile(srcPath, 'utf-8')
  const renderable = {
    srcPath,
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
      overwritten = true
      throw new Error('overwrite')
    }
  } catch (_) {
    const fileRenderedHTML = template({
      pagePath: srcPath,
      pageSizeKB: Math.floor(fileSourceMD.length / 1024),
      pageTitle: path.basename(srcPath),
      pageContent: mdit.render(fileSourceMD),
      breadcrumbs
    })

    await fs.writeFile(fileDestPath, fileRenderedHTML)

    const fileRenderDurationMTS = pageRenderTimer()

    renderable.fileHTML = fileRenderedHTML
    renderable.fileRenderDurationMTS = fileRenderDurationMTS
    renderable.fileRendered = true

    l.info(
      'rendered in %sms: %s %s',
      cls.green(fileRenderDurationMTS),
      cls.cyan(fileDestPath),
      overwritten ? cls.red('[overwritten]') : ''
    )
  }

  return renderable
}

module.exports = renderFile
