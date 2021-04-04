const Router = require("@koa/router");
const articleHandler = require("../DB/handler/articleHanlde");
const brickHandler = require("../DB/handler/brickHandle")
const router = new Router()




router.get('/likeArticle',async ctx=>{
    let {id}= ctx.query
    await articleHandler.likeArticle(id)
})

//获取一篇文章
router.get('/getArticle',async ctx=>{
    let {id}= ctx.query
    let res = await articleHandler.getArticle(id)

    ctx.body = {
        res,
        message:"获取文章成功"
    }
})

//添加一篇文章
router.post('/addArticle',async ctx=>{
    let {topicId,creator} = ctx.request.body
    let res = await articleHandler.createArticle(topicId,creator)
    return res
})
//修改文章的内容
router.post('/changeArticle', async ctx => {
    let { _id, content } = ctx.request.body
    let message = await articleHandler.changeArticle(_id, content)
    ctx.body = {
        message
    }

})

//修改模块名称
router.post('/changeModuleName', async ctx => {
    let { _id, id, rename ,email} = ctx.request.body;
    ctx.body = {
        message: "修改模块标题成功"
    }
    await brickHandler.renameModule(_id, id, rename, email)

})



module.exports = router.routes();




