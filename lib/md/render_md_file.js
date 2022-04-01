const { promises: fs } = require('fs')
const mdit = require('./markdown_it')

const renderMdFile = async (args = {}) => {
  const { filePath } = args
  const md = await fs.readFile(filePath, 'utf-8')

  return mdit.render(md)
}

module.exports = renderMdFile
