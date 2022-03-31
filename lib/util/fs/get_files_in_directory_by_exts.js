const path = require('path')
const _includes = require('lodash/includes')
const getNodesInDirectory = require('./get_nodes_in_directory')

/**
 * Returns all markdown files in the specified directory as fs nodes. By
 * default considers files with '.md' or '.markdown' extensions.
 *
 * @async
 * @throws {Error} if the directory is not accessible.
 *
 * @param {object} [args={}] args - args
 * @param {string} [args.dirPath=''] - path to search for markdown files in
 * @param {boolean} [args.allowHidden=false] - if true, includes hidden files
 *   (prefixed with a '.') in results.
 * @param {string[]} [args.exts] - extensions to filter for
 * @param {boolean} [args.recursive] - if true, recurses into subdirectories
 * @returns {Promise<string[]>} p
 */
const getFilesInDirectoryByExts = async (args = {}) => {
  const { exts = [], ...queryArgs } = args
  const nodes = await getNodesInDirectory(queryArgs)
  const { files = [] } = nodes

  return files.filter(f => _includes(exts, path.extname(f)))
}

module.exports = getFilesInDirectoryByExts
