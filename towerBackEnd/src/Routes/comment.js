const Router = require("@koa/router");
const commentHandler = require("../DB/commentHandle");
const router = new Router();




router.get('/getComment',async ctx=>{
    let {bindId} = ctx.query;
    let res = await commentHandler.getComment(bindId);
    ctx.body={
        res,
        message:1
    }
})

router.post('/createComment',async ctx=>{
    let {bindId,email,content} = ctx.request.body;
    let res = await commentHandler.createComment(bindId,email,content);
    ctx.body={
        res,
        message:1
    }
})

router.post('/deleteComment',async ctx=>{
    let {bindId,commentId} = ctx.request.body;
    let res = await commentHandler.deleteComment(bindId,commentId);
    ctx.body={
        res,
        message:1
    }
})

module.exports = router.routes();