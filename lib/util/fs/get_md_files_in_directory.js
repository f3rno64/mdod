const getFilesInDirectoryByExts = require('./get_files_in_directory_by_exts')

/**
 * Valid markdown extensions. Currently .md and .markdown are considered.
 *
 * @type {string[]}
 */
const VALID_MARKDOWN_EXTENSIONS = ['.md', '.MD', '.markdown']

/**
  * Returns markdown files in the requested directory. Optionally recurses.
  *
  * @async
  * @see getFilesInDirectoryByExts
  * @todo add a typedef for the shared arguments
  *
  * @param {object} [args={}] - args, @see getFilesInDirectoryByExts
  * @returns {Promise<string[]>} p
  */
const getMdFilesInDirectory = async (args = {}) => (
  getFilesInDirectoryByExts({ ...args, exts: VALID_MARKDOWN_EXTENSIONS })
)

module.exports = getMdFilesInDirectory
