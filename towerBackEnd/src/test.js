const mongoose = require('mongoose')
const articleHandler = require('./DB/articleHanlde')
const commentHandler = require('./DB/commentHandle')
const brickHandler = require('./DB/brickHandle');
const informationHandler = require('./DB/informationHandler');
const config = require('../config.js')

mongoose.connect(config.developMode?config.testMongoUrl:config.localmongoUrl,{ useNewUrlParser: true,useUnifiedTopology: true })
async function test(){
    console.log(await informationHandler.deleteBrick(''))
    return 0
}
test()
/* BrickModel.find((err,res)=>{
    if(err){console.log(err)}else{console.log(res[0].content.courses)}
}) */

//得到所有参数并返回


/* userHandler.addNewUser("liuzhengdong","halllo").then(
    (res)=>{
        console.log(res)
    }
) */

/* 
 brickV2.updateOne({_id:"5e9033c9d897ac619c14772b","module._id":"5e905104318e110f0c7fdd8d"},{$push:{"module.$.content":{article:"5e905bc065908e5dd4fe4d5e"}}}).then(
    (res)=>{
        console.log(res)
    }
)  */




/* 
 brickV2.find({_id:"5e9033c9d897ac619c14772b"}).populate({path:"module.content.article",select:"title"}).then(
    (res)=>{
        console.log(res[0].module[0].content[1].article)
    }
) 
 */



/* 
 brickV2.updateOne({_id:"5e9033c9d897ac619c14772b"},{$push:{
    module:{
        name:"新建一个模块",
        content:[]
    }
}}).then(
    (res)=>{
        console.log(res)
    }
) */

/*  
 articleHandler.createNewParagraph("文章测试3","5e9033c9d897ac619c14772b","123","5e903615c7d1bb5fb0d8878a")
.then(
    (res)=>{
        console.log(res)
    }
)
 */

/* articleHandler.createNewParagraph("文章测试","5e91330a500dca545c31b227","# 123","")
 */
/* 
brickHandler.addParaToModule("5e91330a500dca545c31b227","5e9054e2b0c43834403683e8","5e913349338d6a4e2c03f8a3","文章测试").then(
    (res)=>{
        console.log(res)
    }
)
 */