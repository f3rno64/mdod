const os = require('os')
const path = require('path')
const renderCommandHandler = require('./handler')

const HOME_DIR = os.homedir()
const CWD = process.cwd()
const DEFAULT_DIR_PATH = path.relative(HOME_DIR, CWD)

const renderCommand = {
  name: 'render',
  description: 'render multiple markdown files',
  handler: renderCommandHandler,
  definition: (y) => (y
    .option('overwrite', {
      alias: 'w',
      default: true,
      type: 'string',
      describe: 'overwrite existing files'
    })
    .option('s', {
      alias: 'src',
      description: 'directory to render from',
      default: DEFAULT_DIR_PATH
    })
    .option('d', {
      alias: 'dest',
      description: 'directory to write rendered files too',
      required: true
    })
    .option('hidden', {
      description: 'include hidden files (starting with \'.\')',
      default: false
    })
  )
}

module.exports = renderCommand
