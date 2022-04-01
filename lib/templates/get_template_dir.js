const path = require('path')

const TEMPLATE_ROOT_DIR = path.resolve(path.join(__dirname, '../../templates'))

const getTemplatePath = name => (
  path.join(TEMPLATE_ROOT_DIR, `./${name}`)
)

module.exports = getTemplatePath
