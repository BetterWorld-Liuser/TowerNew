let {comment,article} = require('./createModel')


class commentHandler{

//创建一个新的评论
async createComment(bindId,email,content){
    
    await comment.findOneAndUpdate({bindId},{
        $push:{list:{email,content,time:new Date().toLocaleString()}},
    },{upsert:true,useFindAndModify:false})
    let res = comment.findOne({bindId})
    
    return res
}

//获取评论

async getComment(bindId){
    let res = await comment.findOne({bindId})
    //console.log(res)
    if(res==null)return undefined
    return res
    
}

// 删除某个评论
async deleteComment(bindId,commentId){
    await comment.updateOne({bindId},{
        $pull:{list:{_id:commentId}},
    }
    )

    let res = await comment.findOne({bindId})
    return res

}


}


module.exports = new commentHandler()