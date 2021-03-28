const mongoose = require('mongoose')
const config = require('../config.js')
const BrickModdel = require('./DB/SchemaAndModel/brick')

mongoose.connect(config.developMode ? config.localMongoUrl : config.remoteMongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
 async function test(){
    console.log(await BrickModdel.find({title:'测速一个'}))
    return 0
 }

 test()
/* BrickModel.find((err,res)=>{
    if(err){console.log(err)}else{console.log(res[0].content.courses)}
}) */

//得到所有参数并返回

//let jiami = crypto.aesEncrypt("735083049@qq.com");



