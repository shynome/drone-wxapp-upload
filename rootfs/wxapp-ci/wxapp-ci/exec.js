const shell = require("child_process");
const hr = '\n---------------------------------\n'

/**
 * @param {string} file 
 * @param {string[]} args 
 * @param {{ hidden?:number[], slient?:boolean }} options 
 */
const exec = (file='',args=[],options={})=>new Promise((rl,rj)=>{

  let cmdArray = [file,...args]
  
  let { hidden, slient=true } = options
  
  if(hidden){
    hidden.forEach( v=>cmdArray[v]='')
  }
  
  let cmd = cmdArray.join(' ')
  console.log(`${hr}执行命令: ${cmd} ${hr}`)
  const proc = shell.spawn(file,  args, {  stdio: [ 'ignore', 'inherit', slient?'ignore':'inherit'] })
  proc.on('exit',(code)=>{
    if(code !== 0){
      rj(`${cmd} 执行失败, 退出状态码: ${code}`)
      return
    }
    rl()
  })
})

module.exports = exec
