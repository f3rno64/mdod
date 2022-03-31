const cls = require('colors')
const _isError = require('lodash/isError')

/**
 * Represents an error encountered when highlighting an input string with an
 * explicit language via `highlight.js`.
 *
 * @class
 * @extends {Error}
 */
class HLJSHighlightError extends Error {
  /**
   * Creates a new HLJSHighlightAutoError object.
   *
   * @param {string} lang - source language
   * @param {string} str - source
   * @param {Error} origError - original error, if any
   */
  constructor (lang, str, origError) {
    const origMsg = _isError(origError)
      ? origError.message
      : 'internal error'

    const msg = [
      'Error highlighting',
      `${cls.green(lang)}`,
      `'${cls.cyan(str)}':`,
      `${cls.red(origMsg)}`
    ].join(' ')

    super(msg)

    this.name = 'HLJSHighlightError'
    this.str = str
  }

  /**
   * Returns the string that triggered the error.
   *
   * @returns {string} str
   */
  getString () {
    return this.str
  }
}

module.exports = HLJSHighlightError
