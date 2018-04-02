#!/usr/bin/env node
const program = require('commander')

program.version(require('../package').version)

program.usage('<command>')

program
     .command('add')
     .description('add a new template')
    .alias('a')
    .action(()=>{
        require('../command/add')()
    })

program
    .command('create')
    .description('init a project')
    .alias('c')
    .action(()=>{
        require('../command/create')()
    })



program.parse(process.argv)

if(!program.args.length){
    program.help()
}