const shell = require("child_process");
const hr = '\n---------------------------------\n'

/**
 * @param {string} file 
 * @param {string[]} args 
 */
const exec = (file='',args=[])=>new Promise((rl,rj)=>{
  let cmd = [file,...args].join(' ')
  console.log(`${hr}执行命令: ${cmd} ${hr}`)
  const proc = shell.spawn(file,  args, {  stdio: [ 'ignore', 'inherit', 'ignore'] })
  proc.on('exit',(code)=>{
    if(code !== 0){
      rj(`${cmd} 执行失败, 退出状态码: ${code}`)
      return
    }
    rl()
  })
})

module.exports = exec
