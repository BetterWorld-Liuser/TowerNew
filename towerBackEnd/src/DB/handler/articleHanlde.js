let { article } = require('../model/createModel')



class articleHandler {
    //锁定文章
    async lockArticle(){
        await article.updateOne({_id},{lock:true})
    }
    //修改文章内容
    async changeArticle(_id, content) {

        await article.updateOne({ _id },
            {
                $set: {
                    content,
                    updateTime: new Date().toLocaleString(),
                }
            }
        )
        return '修改成功'
    }
    //喜欢篇文章
    async likeArticle(_id) {

        await article.updateOne(
            { id },
            { $inc: { "like": 1 } }
        )
    }
    //得到文章内容
    async getArticle(id) {
        let res={}
        if(id[8]=='-'){
            res = await article.findOne(
                { id:id }
            )
        }else{
            res = await article.findOne(
                { _id:id }
            )
        }
         
        return res
    }
    //创建一篇文章
    async createArticle(topicId,creator) {
        let res = await article.create({
            topicId,
            creator
        })
        return res
    }
}





module.exports = new articleHandler()