const { promises: fs } = require('fs')
const ensurePath = require('./ensure_path')

/**
 * Returns an array of filenames in the specified directory.
 *
 * @async
 * @throws {Error} if the directory is not accessible.
 *
 * @param {string} [dirPath=''] - directory to read
 * @returns {Promise} p - resolves to an array of filenames
 */
const getFilesInDirectory = async (dirPath = '') => {
  await ensurePath(dirPath)

  return fs.readdir(dirPath)
}

module.exports = getFilesInDirectory
