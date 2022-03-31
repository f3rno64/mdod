const path = require('path')
const _includes = require('lodash/includes')
const getFilesInDirectory = require('./get_files_in_directory')

/**
 * Valid markdown extensions. Currently .md and .markdown are considered.
 *
 * @type {string[]}
 */
const VALID_MARKDOWN_EXTENSIONS = ['.md', '.markdown']

/**
 * Returns all markdown files in the specified directory as fs nodes. By
 * default considers files with '.md' or '.markdown' extensions.
 *
 * @async
 * @throws {Error} if the directory is not accessible.
 *
 * @param {string} [dirPath=''] - path to search for markdown files in
 * @param {boolean} [allowHidden=false] - if true, includes hidden files
 *   (prefixed with a '.') in results.
 * @param {string[]} [validExts?] - optional list of supplemental valid
 *   extensions.
 */
const getMdFilesInDirectory = async (dirPath = '', allowHidden, validExts = []) => {
  const files = await getFilesInDirectory(dirPath)
  const mdFiles = files.filter((file) => {
    const fileExt = path.extname(file).toLowerCase()
    const isMD = _includes([...VALID_MARKDOWN_EXTENSIONS, ...validExts], fileExt)

    return !(!isMD || (!allowHidden && path.basename(file).startsWith('.')))
  })

  return mdFiles
}

module.exports = getMdFilesInDirectory
