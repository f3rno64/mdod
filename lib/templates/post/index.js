const path = require('path')
const hbs = require('handlebars')
const PI = require('p-iteration')
const { promises: fs } = require('fs')
const getTemplateDir = require('../get_template_dir')
const { getFilesInDirectoryByExts } = require('../../util')

const TEMPLATE_NAME = 'post'

const postTemplate = async () => {
  const templateDir = getTemplateDir(TEMPLATE_NAME)
  const templatePath = path.join(templateDir, './index.hbs')
  const templatePartialsDir = path.join(templateDir, './partials')
  const templatePartialsPaths = await getFilesInDirectoryByExts({
    dirPath: templatePartialsDir, exts: ['.hbs']
  })

  await PI.forEach(templatePartialsPaths, async partialPath => {
    const partialName = path.basename(partialPath, '.hbs')
    const partialContent = await fs.readFile(partialPath, 'utf8')

    hbs.registerPartial(partialName, partialContent)
  })

  const templateString = await fs.readFile(templatePath, 'utf-8')
  const template = hbs.compile(templateString)

  return template
}

module.exports = postTemplate
