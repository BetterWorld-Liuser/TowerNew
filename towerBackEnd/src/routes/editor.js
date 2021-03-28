const Router = require("@koa/router");
const router = new Router();
const ArticleModel = require('../DB/SchemaAndModel/article')


//获得文档
router.get('/getArticle',async ctx=>{
    let {_id} = ctx.query;
    let res = await ArticleModel.findOne({_id})
    ctx.body = {
        res,
        message:"获取文章成功:"+_id
    }
})


//更新文档
router.post('/changeArticle',async ctx=>{
    let {_id,content} = ctx.request.body;
    await ArticleModel.updateOne({_id},{
        $set:{
            content,
            updateTime:new Date().toLocaleString()
        }
    })

    ctx.body = {
        message:"成功提交"
    }
})

module.exports = router.routes()