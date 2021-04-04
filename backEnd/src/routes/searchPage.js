let Router = require("koa-router");
let router = new Router();
let BrickModel = require('../DB/SchemaAndModel/brick');
let ArticleModel = require('../DB/SchemaAndModel/article')
const information = require("../DB/SchemaAndModel/information");


//Get
//100个最热的砖石
router.get('/oneHundredBrickHot',async ctx=>{
    let res = await BrickModel.find({},{seeTimes:1,watchingUser:1,title:1,modules:1}).sort({seeTimes:-1}).limit(100);
    ctx.body={
        res,
        message:"请求成功"
    }
})
//100个最新的砖石
router.get('/oneHundredBrickNew',async ctx=>{
    let res =await BrickModel.find({},{seeTimes:1,watchingUser:1,title:1,modules:1}).sort({_id:-1}).limit(100);
    ctx.body={
        res,
        message:"请求成功"
    }
})
//砖石列表
router.get('/searchList',async ctx=>{
    let res = await BrickModel.find({},{_id:1,title:1})
    ctx.body = {
        res,
        message:"请求成功"
    }
})


//Post
//新建砖石
router.post('/createBrick',async ctx=>{
    let {title,email} = ctx.request.body;
    let exit = await BrickModel.find({title})
    if(exit.length!=0){
        ctx.body = {
            message:"添加已存在",
            _id:exit[0]._id
        }
        return
    }
    let res = await BrickModel.create({title,author:email});
    let articleData = await ArticleModel.create({creator:email})
    await BrickModel.updateOne({_id:res._id},{$push:{
        modules:{
            $each:[{name:'新模块',level:0,id:articleData._id}],
            $position:0
        }
    }})
    ctx.body = {
        message:"添加砖石成功",
        _id:res._id
    }
    await information.updateOne({},{$inc:{brickNew:1,brickNumber:1}})

})


module.exports = router.routes()