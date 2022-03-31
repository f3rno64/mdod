const { getLogger } = require('f3rno64-lib')

const l = getLogger('serve')

const serveCommandHandler = async (argv = {}) => {
  const { dir } = argv

  l.info('serving from %s', dir)
}

module.exports = serveCommandHandler
