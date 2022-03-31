const { promises: fs } = require('fs')
const { FSAccessError } = require('../../errors')

const ensurePath = async (dirPath = '') => {
  try {
    await fs.access(dirPath)
  } catch (err) {
    throw new FSAccessError(dirPath, err)
  }
}

module.exports = ensurePath
