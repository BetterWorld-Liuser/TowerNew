
let { brick } = require('./createModel')


class brickHandler {

    //新建一块砖石
    async addbrick(title, author) {
        let res = await brick.create({ title, author,modules:[
            {
                name:"初始模块（双击增加子模块）",
            }
        ] })
        return res
    }
    //修改一块砖石的名字
    async changeBrickTitle(_id, email, title) {
        await brick.updateOne({ _id }, { $set: { title },$push:{ editHistory: { email, content:'修改了砖石的名字:'+title}} })
    }
    //获得一块砖石
    async getBrick(_id) {

        let res = await brick.findOne({ _id })
        return res
    }
    //添加一个Module
    async addModule(_id, name, level, id, i, email) {
        await brick.updateOne({ _id }, {
            $push: {
                modules: {
                    $each: [{ name, level, id }],
                    $position: i
                }
            }
        })
    }
    //删除一个module
    async deleModule(_id, id, email) {
        await brick.updateOne({ _id }, {
            $pull: { "modules": { id } }
        })
    }

    //交换Module的顺序
    async sortModule(_id, swap1, swap2, email) {

        let brick = await this.getBrick(_id)
        let temp = brick.modules[swap1]
        brick.modules.splice(swap1, 1)
        brick.modules.splice(swap2, 0, temp)
        await brick.updateOne({ _id }, { $set: { modules: brick.modules } })

    }

    //修改某个模块的level
    async changeModuleLevel(_id, id, level, email) {
        let res = await brick.updateOne({ _id, "modules.id": id }, {
            $set: { "modules.$.level": level }
        })
    }
    //修改一个模块的名字
    async renameModule(_id, id, rename, email) {
        await brick.updateOne({ _id, "modules.id": id }, {
            $set: { "modules.$.name": rename }
        })
    }

    //砖石点击量增加
    async addSee(_id) {
        await brick.updateOne({ _id }, {
            $inc: { seeTimes: 1 }
        })
    }

    //添加关注此砖石的人
    async watchingAdd(_id, email) {
        let res = await brick.updateOne({ _id }, { $addToSet: { watchingUser: email } })
        console.log(email)
        return res
    }

    //去除关注此砖石的人
    async watchingRemove(_id, email) {
        await brick.updateOne({ _id }, {
            $pull: { watchingUser: email }
        })
    }

    //喜欢这个砖石
    async likeBrick(_id) {
        //console.log(1)
        await brick.updateOne({ _id }, {
            $inc: { like: 1 }
        })
    }

    //获取最热100个砖石
    async oneHundredBrick(){
        return await brick.find({},{seeTimes:1,watchingUser:1,title:1,modules:1}).sort({seeTimes:-1}).limit(100);
    }

    //获取最热100个砖石
    async oneHundredBrickNew(){
        return await brick.find({},{seeTimes:1,watchingUser:1,title:1,modules:1}).sort({_id:-1}).limit(100);
    }

    //删除砖石
    async deleteBrick(_id){
        await brick.findOneAndRemove({_id})
    }

    //获得砖石列表
    async getBrickList(){
        return await brick.find({},{_id:1,title:1})
    }

}

module.exports = new brickHandler()