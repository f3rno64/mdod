const hljs = require('highlight.js')
const MarkdownIt = require('markdown-it')
const HLJSHighlightError = require('../errors/hljs_highlight_error')
const HLJSHighlightAutoError = require('../errors/hljs_highlight_auto_error')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  quotes: '“”‘’',
  highlight: function (str, language) {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(str, { language }).value
      } catch (err) {
        throw new HLJSHighlightError(language, str, err)
      }
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {
      throw new HLJSHighlightAutoError(language, str, err)
    }
  }
})

module.exports = md
