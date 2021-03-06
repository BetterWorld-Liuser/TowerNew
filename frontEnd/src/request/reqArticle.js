import app from '../request/main'

class reqArticle {

    //获取文章内容
    async getArticle(_id,id,moduleId) {
        let { data } = await app.get('/article/getArticle',
            {
                params: {
                    _id,
                    id,
                    moduleId
                }
            }
        )
        return data
    }

    async getArticleTo(id){
        let { data } = await app.get('/article/getArticleTo',
            {
                params: {

                    id,

                }
            }
        )
        return data
    }

    //修改文章内容
    async changeArticle(id,content,oldVersion) {
        let { data } = await app.post('/needlog/changeArticle', { id, content,oldVersion })
        return data.message
    }

    //喜欢篇文章
    async likeArticle(id) {
        await app.post('/article/likeArticle', { id })

    }

    //创建文章
    async createArticle(_id,id,moduleId,creator) {
        let res = await app.post('/needLog/createArticle', {
            _id,
            id,
            moduleId,
            creator
        })
        return res
    }


}

export default new reqArticle()