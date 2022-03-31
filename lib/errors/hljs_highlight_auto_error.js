const HLJSHighlightError = require('./hljs_highlight_error')

class HLJSHighlightAutoError extends HLJSHighlightError {
  constructor (lang, str, origError) {
    super(lang, str, origError)

    this.name = 'HLJSHighlightAutoError'
  }
}

module.exports = HLJSHighlightAutoError
