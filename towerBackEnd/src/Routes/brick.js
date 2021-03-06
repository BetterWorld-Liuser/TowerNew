const Router = require("@koa/router");
const handler = require("../DB/brickHandle");
const userHandler = require("../DB/userhandle");
const articleHandler = require("../DB/articleHanlde");
const brickHandler = require("../DB/brickHandle");
const router = new Router();


router.get('/mostHot',async ctx=>{
    //console.log('访问了')
    let res = await brickHandler.mostHot()
    ctx.body={
        res,
        message:"请求成功"
    }
})

router.get('/mostNew',async ctx=>{
    let res = await brickHandler.mostNew()
    ctx.body={
        res,
        message:"请求成功"
    }
})

router.get('/getBrick',async ctx=>{
    let {_id} = ctx.query;
    let res = await brickHandler.getBrick(_id)
    await brickHandler.addSee(_id)
    ctx.body={
        res,
        message:"获得砖石成功"
    }
})

router.post('/likeBrick',async ctx=>{
    let {_id} = ctx.request.body
    brickHandler.likeBrick(_id)
    ctx.body = {
        message:1
    }
})

router.post('/deleteBrick',async ctx=>{
    let {_id} = ctx.request.body;
    brickHandler
})





module.exports = router.routes();