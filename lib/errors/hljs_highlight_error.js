const cls = require('colors')

class HLJSHighlightError extends Error {
  constructor (lang, str, origError) {
    const origMsg = origError.message
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

  getString () {
    return this.str
  }
}

module.exports = HLJSHighlightError
