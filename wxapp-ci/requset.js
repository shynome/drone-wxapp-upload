const http = require('http')
const fs = require('fs')
const config = require('./config')

const req = (url='') => new Promise((rl,rj)=> {

  let port = fs.readFileSync(config.idePortFilepath,'utf8')
  
  let client = http.get(`http://127.0.0.1:${port}${('/'+url).replace('//','/')}`,(res)=>{
    let data = ''
    res.on('data',chunk=>data+=chunk)
    res.once('error',(err)=>{
      client.abort()
      rj(err)
    })
    res.on('end',()=>{
      rl(JSON.parse(data))
    })
  })
  
})

module.exports = req
