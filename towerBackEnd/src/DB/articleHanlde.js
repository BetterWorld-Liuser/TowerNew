let { article } = require('./createModel')
let uuidv4 = require('uuid').v4



class articleHandler {
    //总的检查
    async check(id, oldVersion) {
        let articleData = await this.getArticle(id)
        /* for(let i = 0;i<articleData.collaboratorv2.length;i++){
            id(articleData.collaboratorv2[i].email==email){
                return true
            }
        }
        return */
        //console.log(id)
        if (this.checkLock(articleData)) return '该砖石被liuser锁定，无法修改（这是砖石锁定的唯一方法）'
        if (this.checkOtherChange(articleData, oldVersion)) return 'pass';
        return '对不起，版本号不一致，请保存您的内容后重新修改';
    }

    //修改文章内容
    async changeArticle(id, email, content, oldVersion) {
        let checkRes = await this.check(id, oldVersion)
        if (checkRes != 'pass') return checkRes;
        let version = uuidv4()
        await article.updateOne({ id },
            {
                $set: {
                    content,
                    updateTime: new Date().toLocaleString(),
                    version
                }
            }
        )
        this.createHistory(id, email, version, content)
        this.upCollaboratorv2(id, email)
        
        return '修改成功'
    }
    //添加文章的历史记录
    async createHistory(id, email, version, content) {
        let res = await article.updateOne(
            { id },
            {
                $push: {
                    historyv3: {
                        email,
                        editTime: new Date().toLocaleString(),
                        version,
                        content
                    }
                }
            }
        )
        //console.log('增加history')
        return res;
    }
    //喜欢篇文章
    async likeArticle(id) {

        await article.updateOne(
            { id },
            { $inc: { "like": 1 } }
        )
    }
    //得到文章内容
    async getArticle(id) {

        let res = await article.findOne(
            { id }
        )
        return res
    }

    async addCollaboratorv2(id, email) {
        article.updateOne({ id }, {
            $push: {
                collaboratorv2: {
                    email
                }
            }
        })
    }
    //增加协作者协作次数
    async upCollaboratorv2(id, email) {
        await article.updateOne({ id, 'collaboratorv2.email': email }, {
            $inc: {
                "collaboratorv2.$.editTimes": 1
            }
        })
        //console.log('增加协作者数量')
        return;
    }
    //创建一篇文章
    async createArticle(uuid, creator) {
        let res = await article.create({
            id: uuid,
            creator
        })
        return res
    }

    //检查修改的文章中间是否没有其他操作
    checkOtherChange(articleData, oldVersion) {
        if (articleData.version == oldVersion || articleData.version == '') return true;
        return false
    }
    //检查文章是否被锁定
    checkLock(articleData) {
        if (articleData.lock) return true
        return false
    }
}





module.exports = new articleHandler()