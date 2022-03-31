const pug = require('pug')
const path = require('path')

const compiledTemplate = pug.compileFile(
  path.join(__dirname, './md_default.pug')
)

module.exports = compiledTemplate
