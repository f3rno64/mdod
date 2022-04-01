const path = require('path')
const hbs = require('handlebars')
const PI = require('p-iteration')
const { promises: fs } = require('fs')
const getTemplateDir = require('../get_template_dir')
const { getFilesInDirectoryByExts } = require('../../util')

const TEMPLATE_NAME = 'post'

const postTemplate = async () => {
  const srcDir = getTemplateDir(TEMPLATE_NAME)
  const hbsIndexPath = path.join(srcDir, './index.hbs')
  const publicDir = path.join(srcDir, './public')
  const partialsDir = path.join(srcDir, './partials')
  const partialsPaths = await getFilesInDirectoryByExts({
    dirPath: partialsDir, exts: ['.hbs']
  })

  await PI.forEach(partialsPaths, async partialPath => {
    const partialName = path.basename(partialPath, '.hbs')
    const partialContent = await fs.readFile(partialPath, 'utf8')

    hbs.registerPartial(partialName, partialContent)
  })

  const templateString = await fs.readFile(hbsIndexPath, 'utf-8')
  const renderer = hbs.compile(templateString)

  return {
    renderer,
    publicDir,
    partialsDir,
    hbsIndexPath,
    partialsPaths,
    templateString
  }
}

module.exports = postTemplate
