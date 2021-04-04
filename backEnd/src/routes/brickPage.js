let Router = require("koa-router");
let router = new Router();
let BrickModel = require('../DB/SchemaAndModel/brick')
let ArticleModel = require('../DB/SchemaAndModel/article');
const inforModel = require("../DB/SchemaAndModel/information");

//Get
//获取页面上的砖石
router.get('/getBrick',async ctx=>{
    let {_id} = ctx.query;
    await BrickModel.updateOne({_id},{$inc:{seeTimes:1}})
    
    let res = await BrickModel.findOne({_id})
    ctx.body = {
        res,
        message:"获取砖石成功"+_id
    }
    await inforModel.updateOne({},{$inc:{visitToday:1,visit:1}})
})

//获取文章的数据
router.get('/getArticle',async ctx=>{
    let {_id} = ctx.query;
    let res={}
        if(_id[8]=='-'){
            res = await ArticleModel.findOne(
                { id:_id }
            )
        }else{
            res = await ArticleModel.findOne(
                { _id }
            )
        }
    ctx.body = {
        res,
        message:"获取文章成功"+_id
    }
})


//Post
//调整砖石的标题
router.post('/changeBrickTitle',async ctx=>{
    let {_id,title} = ctx.request.body;
    await BrickModel.updateOne({_id},{$set:{
        title
    }});
    ctx.body={
        message:"标题修改成功"
    }
})

//修改模块顺序
router.post('/changeModuleList',async ctx=>{
    let {_id,swap1,swap2} = ctx.request.body;
    let {modules} = await BrickModel.findOne({_id});
    let temp = modules[swap1]
    modules.splice(swap1,1);
    modules.splice(swap2,0,temp)
    await BrickModel.updateOne({_id},{$set:{modules}})
    ctx.body={
        message:"修改模块顺序成功"
    }
})

//添加关注砖石的人
router.post('/addWatch',async ctx=>{
    let {_id,email} = ctx.request.body;
    await BrickModel.updateOne({_id},{$addToSet:{watchingUser: email}})
    ctx.body={
        message:"添加关注砖石的人成功"
    }
})

//删除关注砖石的人
router.post('/removeWatch',async ctx=>{
    let {_id,email} = ctx.request.body;
    await BrickModel.updateOne({_id},{$pull:{watchingUser:email}})
    ctx.body={
        message:"移除关注的人成功"
    }
})
//点赞砖石
router.post('/likeBrick',async ctx=>{
    let {_id} = ctx.request.body;
    await BrickModel.updateOne({_id},{
        $inc:{like:1}
    })
})

//新建模块
router.post('/createModule',async ctx=>{
    let {_id,level,i,email} = ctx.request.body;
    let articleData = await ArticleModel.create({creator:email})
    let res = await BrickModel.updateOne({_id},{$push:{
        modules:{
            $each:[{name:'新模块',level,id:articleData._id}],
            $position:i
        }
    }})
    ctx.body={
        res,
        message:"新建模块成功"
    }
    await inforModel.updateOne({},{$inc:{articleNew:1,articleNumber:1}})
})
//修改模块名称
router.post('/changeModuleName',async ctx=>{
    let {_id,id,newName} = ctx.request.body;
    await BrickModel.updateOne({_id,"modules.id":id},{
        $set:{
            "modules.$.name":newName
        }
    })
    ctx.body={
        message:"修改模块名称成功"
    }
})
//修改模块等级
router.post('/changeModuleLevel',async ctx=>{
    let {_id,id,level} = ctx.request.body;
    await BrickModel.updateOne({_id, "modules.id": id},{
        $set:{
            "modules.$.level": level
        }
    })
    ctx.body={
        message:"修改模块等级成功"
    }
})


//adminPost
//删除一块砖石
router.post('/deleBrick',async ctx=>{
    let {_id} = ctx.request.body;
    await BrickModel.deleteOne({_id});
    ctx.body={
        message:"删除砖石成功"
    }
    await inforModel.updateOne({},{$inc:{brickNumber:-1}})
})

//删除模块
router.post('/deleModule',async ctx=>{
    let {_id,id} = ctx.request.body;
    await BrickModel.updateOne({_id},{
        $pull:{"modules":{id}}
    });
    ctx.body={
        message:"删除模块成功"
    }
    
})

//TODO 评论砖石
router.post('/commenBrick',async ctx=>{
    let {_id,words,email} = ctx.request.body;
    ctx.body={}
})
//TODO 建议删除评论
//TODO 删除评论

module.exports = router.routes()







