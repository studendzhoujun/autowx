/*
 * @Author: zhouJun 
 * @Date: 2018-04-02 14:11:13 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-04-02 15:01:57
 */
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const stat = fs.stat
function emptyDirectory(path, fn) {
    console.log('path:',path)
    fs.readdir(path, function (err, files) {
        if (err && err.code !== 'ENOENT') throw err
        fn(!files || !files.length)
    })
}

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
let copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;       

            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );   
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
let exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};
module.exports=()=>{
    function * create(){
        let proName = yield prompt('project name: ') 
        console.log(chalk.blue(`proName is ${proName}`))   
        console.log(chalk.red(`当前工作目录 ${process.cwd()}`))  
        let url = `${process.cwd()}/${proName}`   
        emptyDirectory(url,(empty)=>{
            if(empty){
                console.log(chalk.blue('可以创建'))
                exists(path.join(__dirname,'..','temp'),url,copy)
                // process.exit()                
            }else{
                console.log(chalk.red('此目录已存在'))
                process.exit()
            }
        })
    }
    co(create)
}
