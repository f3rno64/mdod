const HLJSHighlightError = require('./hljs_highlight_error')

/**
 * Represents an error encountered when automatically highlighting an input
 * string with `highlight.js`.
 *
 * @class
 * @extends {HLJSHighlightError}
 */
class HLJSHighlightAutoError extends HLJSHighlightError {
  /**
   * Creates a new HLJSHighlightAutoError object.
   *
   * @param {string} lang - source language
   * @param {string} str - source
   * @param {Error} origError - original error, if any
   */
  constructor (lang, str, origError) {
    super(lang, str, origError)

    this.name = 'HLJSHighlightAutoError'
  }
}

module.exports = HLJSHighlightAutoError
