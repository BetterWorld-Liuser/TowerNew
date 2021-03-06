const Router = require("@koa/router");
const userHandler = require("../DB/userhandle");
const articleHandler = require("../DB/articleHanlde");
const UUID = require('uuid');
const brickHandle = require("../DB/brickHandle");
const router = new Router()
const uuidv4 = UUID.v4



router.get('/likeArticle',async ctx=>{
    let {id}= ctx.query.body
    await articleHandler.likeArticle(id)
})

router.get('/getArticle',async ctx=>{
    let {_id,id,moduleId}= ctx.query
    //console.log(id)
    let res = {}
    if(id==""){
        let uuid = uuidv4()
        res = await articleHandler.createArticle(uuid,"735083049@qq.com")
        await brickHandle.addModuleuuid(_id,moduleId,uuid)
    }else{
        res = await articleHandler.getArticle(id)
    }
    
    //console.log(res)
    ctx.body = {
        res,
        message:"获取文章成功"
    }
})

router.get('/getArticleTo',async ctx=>{
    let {id}= ctx.query
    //console.log(id)
    
    let res = await articleHandler.getArticle(id)
    //console.log(res)
    ctx.body = {
        res,
        message:"获取文章成功"
    }
})


module.exports = router.routes();




