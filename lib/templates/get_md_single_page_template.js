const { promises: fs } = require('fs')
const hbs = require('handlebars')
const path = require('path')

const getMdSinglePageTemplate = async () => {
  const templatePath = path.resolve(__dirname, './md_single_page.hbs')
  const templateString = await fs.readFile(templatePath, 'utf-8')
  const template = hbs.compile(templateString)

  return template
}

module.exports = getMdSinglePageTemplate
