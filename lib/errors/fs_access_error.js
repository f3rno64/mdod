const cls = require('colors')

class FSAccessError extends Error {
  constructor (path, origError) {
    const origMsg = origError.message
    const msg = `Cannot access ${cls.cyan(path)}: ${cls.red(origMsg)}`

    super(msg)

    this.name = 'FSAccessError'
    this.path = path
  }

  getPath () {
    return this.path
  }
}

module.exports = FSAccessError
