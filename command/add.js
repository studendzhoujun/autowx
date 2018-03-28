/*
 * @Author: zhouJun 
 * @Date: 2018-03-28 14:21:54 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-03-28 14:57:10
 */
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')

module.exports=()=>{
    function * add(){
        let tplName = yield prompt('Template name: ') 
        let gitUrl = yield prompt('Git https link: ') 
        let branch = yield prompt('Branch: ') 
        console.log(chalk.red('add some'))
        console.log(chalk.blue(`${tplName}+${gitUrl}+${branch}`))        
        process.exit()
    }
    co(add)
}
