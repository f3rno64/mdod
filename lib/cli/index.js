const yargs = require('yargs/yargs')(process.argv.slice(2))
const commands = require('./commands')

let y = yargs.usage('Usage: $0 <command> [options]')

commands.forEach(({ name, description, handler, definition }) => {
  y = y.command(name, description, definition, handler)
})

y = y
  .help('h')
  .alias('help', 'h')
  .epilog('copyright 2022')
  .argv
