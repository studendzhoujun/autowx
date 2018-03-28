#!/usr/bin/env node
const program = require('commander')
console.log('autoweex')

program.version(require('../package').version)

program.usage('<command>')

program
     .command('add')
     .description('add a new template')
    .alias('a')
    .action(()=>{
        require('../command/add')()
    })




program.parse(process.argv)

if(!program.args.length){
    program.help()
}