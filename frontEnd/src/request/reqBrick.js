import app from '../request/main'

class reqBrick {

    //获取砖石
    async getBrick(_id) {

        let { data } = await app.get('/brick/getBrick', {
            params: { _id }
        })

        return data
    }
    //新建砖石
    async createNewBrick(title) {

        let { data } = await app.post('/needlog/createNewBrick', { title })
        return data
    }
    //修改砖石的名字
    async changeBrickName(_id, name) {
        await app.post('/needlog/changeBrickName', { _id, name })
    }
    //修改某个模块的名字
    async changeModuleName(_id, id, rename) {
        await app.post('/needlog/changeModuleName', { _id, id, rename })
    }
    //新建模块同时肯定要添加一个模块
    async addNewModule(_id,level, i) {
        let { data } = await app.post('/needlog/addNewModule', { _id, level, i})
        return data.uuid
    }  
    //删除module
    async deleModule(_id, id) {
        await app.post('/needlog/deleModule', {_id, id})
        
    }  
    //修改某个模块的level
    async changeModuleLevel(_id, id, level) {
        await app.post('/needlog/changeModuleLevel', { _id, id, level })
    }
    //给模块列表重新排序
    async sortModule(_id, swap1, swap2) {
        await app.post('/needlog/sortModule', { _id, swap1, swap2 })
    }

    
    //修改文章内容
    async changeArticle(_id, email, content, version, oldVersion) {
        let { data } = await app.post('/article/changeArticle', { _id, email, content, version, oldVersion })
        return data.message
    }
    //喜欢篇文章
    async likeBrick(_id) {
        await app.post('/brick/likeBrick', { _id })

    }
    //获取评论
    async getComment(bindId) {
        //{id:"",paragraph:"",time:"这个不用，服务器自己来","user":""}
        let { data } = await app.get('/comment/getComment', {
            params: {
                bindId
            }
        })

        return data.list
    }
    //删除一个评论
    async deleteComment(bindId, commentId) {

        await app.get('/comment/deleteComment', {
            params: {
                bindId,
                commentId
            }
        })
    }
    //创建评论
    async createComment(bindId,email,content) {

        let { data } = await app.post('/comment/createComment', { bindId,email,content})

        return data.list
    }
    //添加关注此砖石的人
    async watchingAdd(_id) {
        await app.post('/needlog/watchingAdd',{_id})
    }
    //去除关注此砖石的人
    async watchingRemove(_id){
        await app.post('/needlog/watchingRemove',{_id})
    }
    //随机获取一些砖石
    async getHot() {
        let {data} = await app.get('/brick/mostHot')
        return data.res
    }
    async getNew(){
        let {data} = await app.get('/brick/mostNew')
        return data.res
    }

    
}

export default new reqBrick()

