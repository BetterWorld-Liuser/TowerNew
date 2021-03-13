const mongoose = require('mongoose')
const articleHandler = require('./DB/articleHanlde')
const commentHandler = require('./DB/commentHandle')
const brickHandler = require('./DB/brickHandle');
const informationHandler = require('./DB/informationHandler');
const config = require('../config.js')
const crypto = require('./encryption');
const article = require('./DB/Schema/article');

mongoose.connect(config.developMode ? config.localMongoUrl : config.remoteMongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
 async function test(){
    console.log(await brickHandler['getBrick']('5e9b4d8828490c2f9ebf9064'))
    return 0
 }

 test()
/* BrickModel.find((err,res)=>{
    if(err){console.log(err)}else{console.log(res[0].content.courses)}
}) */

//得到所有参数并返回

//let jiami = crypto.aesEncrypt("735083049@qq.com");



