let Router = require("koa-router");
let router = new Router();
let infoModel = require('../DB/SchemaAndModel/information')

//今日访问量 
//今日砖石新增
//今日用户新增
//今日模块新增

//总访问量
//砖石总量
//总用户数量
//模块总数

router.get('/getInfo',async ctx=>{
    let res = await infoModel.findOne({_id:'604e23a7bde84048acda8da3'})
    ctx.body={
        res,
        message:"获取概览成功"
    }
})

module.exports = router.routes()