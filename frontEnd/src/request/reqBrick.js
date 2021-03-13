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

        let { data } = await app.post('/brick/createNewBrick', { title })
        return data
    }
    //修改砖石的名字
    async changeBrickName(_id, name) {
        await app.post('/brick/changeBrickName', { _id, name })
    }
    //修改某个模块的名字
    async changeModuleName(_id, id, rename) {
        await app.post('/brick/changeModuleName', { _id, id, rename })
    }
    //删除module
    async deleModule(_id, id) {
        await app.post('/brick/deleModule', {_id, id})
    }  
    //修改某个模块的level
    async changeModuleLevel(_id, id, level) {
        await app.post('/brick/changeModuleLevel', { _id, id, level })
    }
    //给模块列表重新排序
    async sortModule(_id, swap1, swap2) {
        await app.post('/brick/sortModule', { _id, swap1, swap2 })
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
    //获得100个砖石
    async getOneHundredHot(){
        let {data}=await app.get('/brick/oneHundredBrick')
        return data.res
    }
    //获取最新100个砖石
    async getOneHundredNew(){
        let {data}=await app.get('/brick/oneHundredBrickNew')
        return data.res
    }

    //获得砖石列表
    async getBrickList(){
        let {data}=await app.get('/brick/getBrickList')
        return data.res
    }

    
}

export default new reqBrick()

