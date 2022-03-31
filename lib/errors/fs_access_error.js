const cls = require('colors')
const _isError = require('lodash/isError')

/**
 * Filesystem access error, providing the inaccessible path in the error
 * message.
 *
 * @class
 * @extends {Error}
 */
class FSAccessError extends Error {
  /**
   * Creates a new error object.
   *
   * @param {string} path - path that was deemed inaccessible
   * @param {Error} origError - original error, if any
   */
  constructor (path, origError) {
    const origMsg = _isError(origError)
      ? origError.message
      : 'internal error'

    const msg = `Cannot access ${cls.cyan(path)}: ${cls.red(origMsg)}`

    super(msg)

    this.name = 'FSAccessError'
    this.path = path
  }

  /**
   * Returns the inaccessible path.
   *
   * @returns {string} path - path that was deemed inaccessible
   */
  getPath () {
    return this.path
  }
}

module.exports = FSAccessError
