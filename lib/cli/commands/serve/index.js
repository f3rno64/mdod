const os = require('os')
const path = require('path')
const serveCommandHandler = require('./handler')

const HOME_DIR = os.homedir()
const CWD = process.cwd()
const DEFAULT_DIR_PATH = path.relative(HOME_DIR, CWD)

const serveCommand = {
  name: 'serve',
  description: 'render and serve markdown files',
  handler: serveCommandHandler,
  definition: (y) => (
    y.option('d', {
      alias: 'dir',
      description: 'directory to serve from',
      default: DEFAULT_DIR_PATH
    })
  )
}

module.exports = serveCommand
