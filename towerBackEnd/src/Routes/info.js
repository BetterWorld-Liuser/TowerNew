let Router = require("koa-router");
let infoHandler = require('../DB/informationHandler')
let router = new Router();

router.get('/addvisitToday',async ctx=>{
    let res = await infoHandler.addvisitToday()
    ctx.body={
        res,
        message:1
    }
})

router.get('/getSearchItem',async ctx=>{
    
    let res = await infoHandler.getSearchItem()
    ctx.body={
        res,
        message:1
    }
})

module.exports = router.routes();