const path = require('path')
const cls = require('colors')
const PI = require('p-iteration')
const { promises: fs } = require('fs')
const { getLogger } = require('@f3rno64/lib')
const { getNodesInDirectory } = require('../util')

const l = getLogger('deploy:template:public')

const deployTemplatePublicDir = async (args = {}) => {
  const { destDir, template } = args
  const { publicDir } = template
  const nodes = await getNodesInDirectory({
    dirPath: publicDir,
    allowHidden: false,
    directories: true,
    recursive: false,
    files: true
  })

  const { files, directories } = nodes
  const allNodes = [...files, ...directories]
  const allNodeRelativePaths = allNodes.map(node => (
    path.relative(publicDir, node)
  ))

  l.info(
    '%s nodes found in public directory (%s files, %s directories)',
    cls.cyan(allNodes.length),
    cls.green(files.length),
    cls.green(directories.length)
  )

  allNodes.forEach(node => l.debug('found public node: %s', cls.cyan(node)))

  await PI.forEach(allNodeRelativePaths, async (nodeRelativePath) => {
    const srcPath = path.resolve(path.join(publicDir, nodeRelativePath))
    const destPath = path.resolve(path.join(destDir, nodeRelativePath))
    const stat = await fs.stat(srcPath)

    if (stat.isFile()) {
      await fs.copyFile(srcPath, destPath)
      l.success('copied file: %s', cls.green(destPath))
    } else if (stat.isDirectory()) {
      const destParentPath = path.basename(destPath)

      try {
        await fs.access(destParentPath)
      } catch (_) {
        l.warn(
          'destination is inaccessible, trying to create it: %s',
          cls.yellow(destParentPath)
        )

        await fs.mkdir(destParentPath, { recursive: true })

        l.success('created directory: %s', cls.green(destParentPath))
      }

      await fs.cp(srcPath, destPath, { recursive: true })

      l.success('copied public node: %s', cls.green(destPath))
    }
  })
}

module.exports = deployTemplatePublicDir
