const path = require('path')
const getFilesInDirectory = require('./get_files_in_directory')

/**
 * Returns all markdown files in the specified directory as fs nodes.
 *
 * @async
 * @throws {Error} if the directory is not accessible.
 *
 * @param {string} [dirPath=''] - path to search for markdown files in
 * @param {boolean} [allowHidden=false] - if true, includes hidden files
 *   (prefixed with a '.') in results.
 */
const getMdFilesInDirectory = async (dirPath = '', allowHidden) => {
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
