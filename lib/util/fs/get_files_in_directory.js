const { promises: fs } = require('fs')
const ensurePath = require('./ensure_path')

const getFilesInDirectory = async (dirPath = '') => {
  await ensurePath(dirPath)

  return fs.readdir(dirPath)
}

module.exports = getFilesInDirectory
