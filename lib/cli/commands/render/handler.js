const path = require('path')
const cls = require('colors')
const PI = require('p-iteration')
const { promises: fs } = require('fs')
const { getLogger } = require('f3rno64-lib')
const mdit = require('../../../md/markdown_it')
const getMdFilesInDirectory = require('../../../util/fs/get_md_files_in_directory')
const ensurePath = require('../../../util/fs/ensure_path')

const l = getLogger('render')

/**
 * Renders markdown files to HTML based on passed parameters.
 *
 * @async
 *
 * @param {object} [argv={}] - arguments
 * @param {boolean} [argv.overwrite=false] - if true, existing files are
 *   overwritten
 * @param {boolean} [argv.hidden=true] - if false, hidden files (names starting
 *   with a '.') will not be rendered
 * @param {string} argv.dest - destination directory to write HTML output too
 * @param {string} argv.src - source path to read markdown files from
 */
const renderCommandHandler = async (argv = {}) => {
  const renderStartMTS = Date.now()
  const {
    overwrite = false,
    hidden = true,
    dest: destPath,
    src: srcPath
  } = argv

  l.info('serving from: %s', cls.green(srcPath))

  const files = await getMdFilesInDirectory(srcPath, hidden)
  const artifacts = await PI.map(files, async (file) => {
    const mtsStart = Date.now()

    l.info('rendering: %s', cls.green(file))

    const fileNameNoExt = path.basename(file).split('.')[0]
    const filePath = path.join(srcPath, path.basename(file))
    const fileDestPath = path.join(destPath, `${fileNameNoExt}.html`)

    await ensurePath(filePath)

    const fileMarkdown = await fs.readFile(filePath, 'utf8')

    try {
      await ensurePath(fileDestPath)

      if (!overwrite) {
        l.info('file exists: %s', cls.green(fileDestPath))

        const fileRender = await fs.readFile(fileDestPath, 'utf8')

        return {
          filePath,
          fileDestPath,
          fileMarkdown,
          fileRender,
          fileRenderMTS: 0,
          rendered: false
        }
      } else {
        l.warn('overwriting: %s', cls.green(fileDestPath))
      }
    } catch (__) {}

    const fileRender = mdit.render(fileMarkdown)

    await fs.writeFile(fileDestPath, fileRender)

    const fileRenderMTS = Date.now() - mtsStart

    l.info('rendered in %sms: %s', cls.green(fileRenderMTS), fileDestPath)

    return {
      filePath,
      fileDestPath,
      fileMarkdown,
      fileRender,
      fileRenderMTS,
      rendered: true
    }
  })

  const renderMTS = Date.now() - renderStartMTS

  l.info('rendered %s pages in %sms', cls.cyan(artifacts.length), cls.green(renderMTS))
}

module.exports = renderCommandHandler
