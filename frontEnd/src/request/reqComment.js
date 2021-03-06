import app from '../request/main'

class reqComment {
    
    //获取评论
    async getComment(bindId) {
        //{id:"",paragraph:"",time:"这个不用，服务器自己来","user":""}
        let { data } = await app.get('/comment/getComment', {
            params: {
                bindId
            }
        })

        return data
    }
    //删除一个评论
    async deleteComment(bindId, commentId) {

        let {data} = await app.post('/comment/deleteComment', { 
                bindId,
                commentId
        })
        //console.log(data)
        return data.res.list
    }
    //创建评论
    async createComment(bindId,email,content) {

        let { data } = await app.post('/comment/createComment', { bindId,email,content})

        return data.res.list
    }
}

export default new reqComment()