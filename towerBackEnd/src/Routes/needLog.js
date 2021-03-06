
const userHandler = require("../DB/userhandle");
const articleHandler = require("../DB/articleHanlde");
let commentHandler = require("../DB/commentHandle");
let infoHandler = require('../DB/informationHandler')
const config = require("../Routes/config")
const jwt = require("koa-jwt")({ secret: config.secret, passthrough: true }); //解码中间件
const Router = require("@koa/router");
const brickHandler = require("../DB/brickHandle");
let uuidv4 = require('uuid').v4
const router = new Router();

router.use(jwt, async (ctx, next) => {
    let res = await userHandler.checkPassWord(ctx.state.user.email, ctx.state.user.password)
    if (res) {
        await next()
    } else {
        ctx.body = {
            message: "你还没登录"
        }
    }
})

/* router.post('/createArticle',async ctx=>{
    
    let {_id,id,moduleId,creator} = ctx.request.body
    let res = {}
    if(moduleId!=""){
        await brickHandler.addModuleuuid(_id,moduleId,id)
        res = await articleHandler.createArticle(id,creator)
    }else{
        res = await articleHandler.createArticle(id,creator)
    }
    
    ctx.body = {
        res,
        message:"创建文章成功"
    }
}) */

router.post('/changeArticle', async ctx => {
    let { id, content, oldVersion } = ctx.request.body
    let message = await articleHandler.changeArticle(id, ctx.state.user.email, content, oldVersion)
    //console.log(message)
    //ctx.status =200
    ctx.body = {
        message
    }
    //console.log(ctx.body)
})

router.post('/createNewBrick', async ctx => {
    let { title } = ctx.request.body;
    let check = await brickHandler.checkBrickName(title)
    if (check) {
        ctx.body = {
            message: "名称重复",
            id: check
        }
    } else {
        let res = await brickHandler.addbrickV3(title, ctx.state.user.email);
        infoHandler.addBrick(title,res._id)
        ctx.body = {
            message: "添加砖石成功",
            id: res._id
        }
    }

})


router.post('/changeBrickName', async ctx => {
    let { _id, name } = ctx.request.body;
    brickHandler.changeBrickName(_id, ctx.state.user.email, name)
    ctx.body = {
        message: 1
    }
})

router.post('/addNewModule', async ctx => {
    let { _id, level, i } = ctx.request.body;
    let uuid = uuidv4()
    ctx.body = {
        uuid,
        message: "添加模块成功"
    }
    await brickHandler.addModule(_id, "新模块", level, uuid, i, ctx.state.user.email)
    await articleHandler.createArticle(uuid, ctx.state.user.email)


})

router.post('/deleModule', async ctx => {
    let { _id, id } = ctx.request.body;

    brickHandler.deleModule(_id, id, ctx.state.user.email)
    ctx.body = {
        message: "删除模块成功"
    }
})

router.post('/sortModule', async ctx => {
    let { _id, swap1, swap2 } = ctx.request.body;
    ctx.body = {
        message: "排序模块成功"
    }
    await brickHandler.sortModule(_id, swap1, swap2, ctx.state.user.email)

})

router.post('/changeModuleLevel', async ctx => {
    let { _id, id, level } = ctx.request.body;
    brickHandler.changeModuleLevel(_id, id, level, ctx.state.user.email)
    ctx.body = {
        message: "修改模块等级成功"
    }
})

router.post('/changeModuleName', async ctx => {
    let { _id, id, rename } = ctx.request.body;
    ctx.body = {
        message: "修改模块标题成功"
    }
    await brickHandler.renameModule(_id, id, rename, ctx.state.user.email)

})


router.post('/watchingAdd', async ctx => {
    let { _id } = ctx.request.body;
    ctx.body = {
        message: "添加关注此砖石的人"
    }
    await brickHandler.watchingAdd(_id, ctx.state.user.email)

})


router.post('/watchingRemove', async ctx => {
    let { _id } = ctx.request.body;
    ctx.body = {
        message: "移除关注此砖石的人"
    }
    await brickHandler.watchingRemove(_id, ctx.state.user.email)

})


router.post('/createComment', async ctx => {
    let { bindId, email, content } = ctx.request.body;
    await commentHandler.createComment(bindId, email, content);
    ctx.body = {
        message: 1
    }
})


router.get('/deleteComment', async ctx => {
    let { bindId, commentId } = ctx.request.body;
    await commentHandler.deleteComment(bindId, commentId);
    ctx.body = {
        message: 1
    }
})

module.exports = router.routes();