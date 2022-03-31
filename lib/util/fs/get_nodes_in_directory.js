const path = require('path')
const PI = require('p-iteration')
const _uniq = require('lodash/uniq')
const _isEmpty = require('lodash/isEmpty')
const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const { promises: fs } = require('fs')

/**
 * @typedef DirectoryNodes
 *
 * @property {string} dirPath - base path for all file & directory names
 * @property {string[]} [files] - array of filenames
 * @property {string[]} [directories] - array of directory names
 */

/**
 * Returns an array of filenames in the specified directory.
 *
 * @async
 * @throws {FSAccessError} if the directory is not accessible.
 *
 * @param {object} [args={}] - args
 * @param {string} [args.dirPath=''] - directory to read
 * @param {boolean} [args.recursive=false] - if true, recurses into subdirectories
 * @param {boolean} [args.files=true] - allows files in res
 * @param {boolean} [args.directories=true] - allows directories in res
 * @param {boolean} [args.allowHidden=false] - if true, includes hidden files
 *   (prefixed with a '.') in res.
 * @returns {Promise<DirectoryNodes>} p
 */
const getNodesInDirectory = async (args = {}) => {
  const {
    files = true, directories = true, dirPath = '', recursive, allowHidden
  } = args

  const rawNodes = await fs.readdir(dirPath)
  const nodes = rawNodes.map(node => path.resolve(path.join(dirPath, `./${node}`)))
  const stats = await PI.map(nodes, async node => fs.stat(node))
  const res = { files: [], directories: [] }

  if (files) {
    res.files = _compact(
      stats.map((stat, i) => stat.isFile() ? nodes[i] : null)
    )
  }

  if (directories) {
    res.directories = _compact(
      stats.map((stat, i) => stat.isDirectory() ? nodes[i] : null)
    )
  }

  if (recursive && !_isEmpty(res.directories)) {
    const nestedResults = await PI.map(res.directories, async (dirPath) => (
      getNodesInDirectory({ ...args, dirPath: `${dirPath}/` })
    ))

    const files = _flatten(nestedResults.map(({ files }) => files))
    const directories = _flatten(nestedResults.map(({ directories }) => directories))

    if (!_isEmpty(files)) {
      res.files = _uniq([...res.files, ...files])
    }

    if (!_isEmpty(directories)) {
      res.directories = _uniq([...res.directories, ...directories])
    }
  }

  if (!allowHidden) {
    if (!_isEmpty(res.files)) {
      res.files = res.files.filter(f => !path.basename(f).startsWith('.'))
    }

    if (!_isEmpty(res.directories)) {
      res.directories = res.directories.filter(f => !path.basename(f).startsWith('.'))
    }
  }

  return res
}

module.exports = getNodesInDirectory
