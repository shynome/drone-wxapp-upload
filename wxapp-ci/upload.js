const drone = require('./lib/drone')
const env = require('./lib/env')
const path = require('path')
const config = require('./config')
const request = require('./requset')
const exec = require('./exec')
const sleep = (time = 1000) => new Promise(rl => setTimeout(rl, time))

const port = `$(cat ${config.idePortFilepath})`

let version = 'dev'
try{
  version = require(path.join(process.cwd(),'package.json')).version
}catch(err){
}
let desc = version

const shExec = (cmd='',options={})=>exec('sh',['-c',cmd],options)

const uploadCmd = (flag='0')=>shExec(`flag=${flag} /wxdt/bin/cli --upload ${version}@$(pwd) --upload-desc '${desc}'`,{ slient: false })

const formatTime = (time='')=>new Date(Number(time)*1000).toLocaleString('chinese',{ timeZone:'Asia/Shanghai' })

let hasRequestedLogin = 0
async function waitLogined(){
  while(true){
    await sleep(1e3)
    let res = await request('/loginresult')
    let { loginStatus, loginStatusMsg } = res
    switch (loginStatus) {
      case 'SUCCESS':
        return
      case 'PENDING':
        continue;
      default:
        if(loginStatusMsg){
          throw new Error(`登录失败. 登录状态: ${loginStatus} , 错误原因: ${loginStatusMsg} `)
        }
        if(hasRequestedLogin){
          continue
        }else{
          throw new Error(`请先调用登录. 当前返回是 ${JSON.stringify(res)}`)
        }
        break;
    }
  }
}

async function waitLogin() {
  
  let report = {
    msgtype: 'link',
    link: {
      'title': `${drone.repo_name} ${drone.build_number} 微信小程序上传需要登录`,
      'text': `微信开发工具登录已过期, 需要重新扫码登录. 打开链接地址进行扫码. \n发送时间: ${formatTime(Date.now().toString())}`,
      'messageUrl': drone.build_link+'/'+drone.build_number,
    }
  }

  await exec("curl", [
    '-X', 'POST',
    '-H', `Content-Type:application/json; charset=UTF-8`,
    '-d', JSON.stringify(report),
    env.get('report_hook'),
  ],{
    hidden: [7],
  });
  console.log('\n')
  
  shExec(`curl 127.0.0.1:${port}/login?format=terminal | /wxapp-ci/bin/qr-reverse && echo '\n登录二维码输出完毕'`)
  hasRequestedLogin = 1
  await waitLogined()
  
}

async function main() {

  try{
    await uploadCmd('first')
  }catch(err){
    await waitLogin()
    await uploadCmd('after_login')
  }
  
}

main()
.catch(
  err=>{
    console.error(err)
    process.exitCode = 1
  }
)
