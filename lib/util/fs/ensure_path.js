const { promises: fs } = require('fs')
const { FSAccessError } = require('../../errors')

/**
 * Ensures the specified path is accessible.
 *
 * @throws {FSAccessError} if the path is not accessible.
 * @async
 *
 * @param {string} [dirPath=''] - path to check
 * @returns {Promise} p - resolves on success
 */
const ensurePath = async (dirPath = '') => {
  try {
    await fs.access(dirPath)
  } catch (err) {
    throw new FSAccessError(dirPath, err)
  }
}

module.exports = ensurePath
