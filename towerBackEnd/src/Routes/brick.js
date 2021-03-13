const Router = require("@koa/router");
const handler = require("../DB/brickHandle");
const userHandler = require("../DB/userhandle");
const articleHandler = require("../DB/articleHanlde");
const brickHandler = require("../DB/brickHandle");
const { email } = require("../DB/Schema/user");
const router = new Router();


router.get('/oneHundredBrick',async ctx=>{
    let res = await brickHandler.oneHundredBrick();
    ctx.body={
        res,
        message:"请求成功"
    }
})

router.get('/oneHundredBrickNew',async ctx=>{
    let res = await brickHandler.oneHundredBrickNew();
    ctx.body={
        res,
        message:"请求成功"
    }
})

//获得某块砖石
router.get('/getBrick',async ctx=>{
    let {_id} = ctx.query;
    let res = await brickHandler.getBrick(_id)
    await brickHandler.addSee(_id)
    ctx.body={
        res,
        message:"获得砖石成功"
    }
})
//获得砖石列表
router.get('/getBrickList',async ctx=>{
    let res = await brickHandler.getBrickList()
    ctx.body={
        res,
        message:"获得砖石列表"
    }
})
//喜欢一块砖石
router.post('/likeBrick',async ctx=>{
    let {_id} = ctx.request.body
    brickHandler.likeBrick(_id)
    ctx.body = {
        message:1
    }
})
//删除一块砖石
router.post('/deleteBrick',async ctx=>{
    let {_id} = ctx.request.body;
    brickHandler
})
//新建一块砖石
router.post('/createNewBrick', async ctx => {

        let res = await brickHandler.addbrickV3(title, ctx.state.user.email);
        ctx.body = {
            message: "添加砖石成功",
            id: res._id
       
    }

})

//修改砖石的标题
router.post('/changeBrickTitle', async ctx => {
    let { _id, title,email } = ctx.request.body;
    brickHandler.changeBrickTitle(_id, email, title)
    ctx.body = {
        message: 1
    }
})

//添加新模块
router.post('/addNewModule', async ctx => {
    let { _id, level, i, email } = ctx.request.body;
    let res = await articleHandler.createArticle(_id,email)
    await brickHandler.addModule(_id,"新模块",level,res._id,i,email)


    ctx.body = {
        message: "添加模块成功"
    }
    



})

router.post('/deleModule', async ctx => {
    let { _id, id } = ctx.request.body;

    brickHandler.deleModule(_id, id, ctx.state.user.email)
    ctx.body = {
        message: "删除模块成功"
    }
})

//改变模块排序
router.post('/sortModule', async ctx => {
    let { _id, swap1, swap2,email } = ctx.request.body;
    ctx.body = {
        message: "排序模块成功"
    }
    await brickHandler.sortModule(_id, swap1, swap2, email)

})

//修改模块名称
router.post('/changeModuleLevel', async ctx => {
    let { _id, id, level,email } = ctx.request.body;
    brickHandler.changeModuleLevel(_id, id, level, email)
    ctx.body = {
        message: "修改模块等级成功"
    }
})

//添加关注此砖石的人
router.post('/watchingAdd', async ctx => {
    let { _id ,email} = ctx.request.body;
    ctx.body = {
        message: "添加关注此砖石的人"
    }
    await brickHandler.watchingAdd(_id, email)

})


//移除关注此砖石的人
router.post('/watchingRemove', async ctx => {
    let { _id , email} = ctx.request.body;
    
    await brickHandler.watchingRemove(_id, email)
    ctx.body = {
        message: "移除关注此砖石的人"
    }
    

})




module.exports = router.routes();