let {information} = require('./createModel')
const { isValidObjectId } = require('mongoose')

class informationHandler {
    //增加今日访问量
    async addvisitToday(){
        await information.updateOne({},{
            $inc:{visitToday:1,visit:1}
        })
    }
    //增加一个砖石
    async addBrick(name,id){
        await information.updateOne({},{
            $push:{brickList:{name,id}}
        })
    }

    //删除一个砖石
    async deleteBrick(name){
        return await information.updateOne({},{
            $pull:{brickList:{name}}
        })
    }
    //增加用户数量
    async addUser(){
        await information.updateOne({},{
            $inc:{userNumber:1}
        })
    }

    //获得数据
    async getSearchItem(){
        let res = await information.findOne({})
        return res
    }

    async create(){
        await information.create({})
    }

}

module.exports = new informationHandler()