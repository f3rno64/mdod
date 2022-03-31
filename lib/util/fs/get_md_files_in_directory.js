const path = require('path')
const getFilesInDirectory = require('./get_files_in_directory')

const getMdFilesInDirectory = async (dirPath, allowHidden) => {
  const files = await getFilesInDirectory(dirPath)
  const mdFiles = files.filter((file) => {
    const isMD = path.extname(file) === '.md'

    if (!isMD) {
      return false
    } else if (!allowHidden && path.basename(file).startsWith('.')) {
      return false
    }

    return true
  })

  return mdFiles
}

module.exports = getMdFilesInDirectory
