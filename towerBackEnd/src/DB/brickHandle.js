
let { brickV3 } = require('./createModel')


class brickHandler {

    //新建一块砖石
    async addbrickV3(title, author) {
        let res = await brickV3.create({ title, author,modules:[
            {
                name:"初始模块（双击增加子模块）",
            }
        ] })
        return res
    }
    //修改一块砖石的名字
    async changeBrickName(_id, email, name) {
        await brickV3.updateOne({ _id }, { $set: { title: name } })

        await this.record(_id, email, "修改了砖石的名字" + name)
    }

    //获得一块砖石
    async getBrick(_id) {

        let res = await brickV3.findOne({ _id })
        return res
    }

    //给列表添加一个数据
    async addModule(_id, name, level, id, i, email) {
        await brickV3.updateOne({ _id }, {
            $push: {
                modules: {
                    $each: [{ name, level, id }],
                    $position: i
                }
            }
        })
        await this.record(_id, email, "给列表添加一个数据")
    }

    //给列表标记上一个uuid
    async addModuleuuid(_id, moduleId, uuid) {
        //console.log(moduleId)
        await brickV3.updateOne({ _id, 'modules._id': moduleId }, {
            $set: {
                'modules.$.id': uuid
            }
        })
    }
    //给列表删除一个数据
    async deleModule(_id, id, email) {
        await brickV3.updateOne({ _id }, {
            $pull: { "modules": { id } }
        })
        await this.record(_id, email, "给列表删除一个数据")
    }

    //给列表重新排序
    async sortModule(_id, swap1, swap2, email) {

        let brick = await this.getBrick(_id)
        let temp = brick.modules[swap1]
        brick.modules.splice(swap1, 1)
        brick.modules.splice(swap2, 0, temp)
        /* this.getBrick(_id).then(async res => {
            constrution["$set"][swapOperation1] = res.modules[swap2]
            constrution["$set"][swapOperation2] = res.modules[swap1]
            console.log(constrution)
            await brickV3.updateOne({ _id }, constrution)
        }) */
        //console.log(brick.modules)
        await brickV3.updateOne({ _id }, { $set: { modules: brick.modules } })
        //console.log(res)
        await this.record(_id, email, "给列表重新排序")
    }

    //修改某个模块的level
    async changeModuleLevel(_id, id, level, email) {
        let res = await brickV3.updateOne({ _id, "modules.id": id }, {
            $set: { "modules.$.level": level }
        })
        console.log(res)
        await this.record(_id, email, "修改某个模块的level")
    }
    //修改一个模块的名字
    async renameModule(_id, id, rename, email) {
        await brickV3.updateOne({ _id, "modules.id": id }, {
            $set: { "modules.$.name": rename }
        })

        await this.record(_id, email, "修改一个模块的名字" + id + rename)
    }

    //砖石点击量增加
    async addSee(_id) {
        await brickV3.updateOne({ _id }, {
            $inc: { seeTimes: 1 }
        })
    }

    //随机获取一些砖石
    async getSomeBrick() {
        let res = await brickV3.aggregate([{ $sample: { size: 6 } }])
        return res
    }

    //添加关注此砖石的人
    async watchingAdd(_id, email) {
        let res = await brickV3.updateOne({ _id }, { $addToSet: { watchingUser: email } })
        console.log(email)
        return res
    }

    //去除关注此砖石的人
    async watchingRemove(_id, email) {
        await brickV3.updateOne({ _id }, {
            $pull: { watchingUser: email }
        })
    }

    //喜欢这个砖石
    async likeBrick(_id) {
        //console.log(1)
        await brickV3.updateOne({ _id }, {
            $inc: { like: 1 }
        })
    }

    //检查是否存在砖石
    async checkBrickName(title) {
        let res = await brickV3.findOne({ title })
        if (res) { return res._id } else { return false }
    }

    //最热
    async mostHot() {
        let res = await brickV3.find().sort({ seeTimes: -1 }).limit(10)
        return res
    }

    //最新
    async mostNew() {
        let res = await brickV3.find().sort({ _id: -1 }).limit(10)
        return res
    }

    //记录编辑的历史
    async record(_id, email, content) {
        await brickV3.updateOne({ _id }, {
            $push: { editHistory: { email, content } }
        })
    }

    //删除砖石
    async deleteBrick(_id){
        await brickV3.findOneAndRemove({_id})
    }







}






/* 
//得到砖石堆和塔堆
let getall=async function(){
    let res={}
    res.bricks = await BrickModel.find({})
    res.towers = await TowerModel.find({})
    return res
}

//添加砖石,检查是否有重复的砖石
let addbrick = async function(add){
    let data=add.brick
    let result={ok:0}
    let check_1 = await BrickModel.findOne({name:data.name})
    if(check_1==null){
        await BrickModel.create({name:data.name,introduce:data.introduce,label:data.label})
        result = {ok:1}
    }else{
        console.log('文档已存在，添加失败'+' - '+myDate.toLocaleString())
        result.message="已有塔，建议刷新界面"
    }
    return result
}

//添加塔，检查是否有重复的塔
let addTower= async function(add){
    let data = add.tower
    let result={ok:0}
    let check_1 = await TowerModel.findOne({name:data.name})
    if(check_1==null){
        await TowerModel.create({name:data.name,introduce:data.introduce,label:data.label,updateTime:data.updateTime,see:data.see})
        result = {ok:1}
    }else{
        result.message="已有塔，建议刷新界面"
    }
    return result
}

//修改砖石，整个修改,传入要更改的砖石的数据
let changeBrick =async function(change){
    let data = change.changebrick

    let result={ok:0}
    let check_1 = await BrickModel.findOne({name:data.name})
    if(check_1 != null){
        let nameold = data.name
        data.name=data.rename
        await BrickModel.updateOne({name:nameold},data)
        result = {ok:1}
    }else{
        console.log('砖石不存在，修改失败'+' - '+myDate.toLocaleString())

    }
    return result
}

//修改塔，传入要更改塔的数据
let changetower =async function(change){
    let data = change.changetower
    let result={ok:0}
    let check_1 = await TowerModel.findOne({name:data.name})
    if(check_1!=null){
        let nameold = data.name
        data.name=data.rename
        await TowerModel.updateOne({name:nameold},data)
        result = {ok:1}
    }else{
        console.log('塔已存在，添加失败'+' - '+myDate.toLocaleString())
    }
    return result
}



//7.得到现有砖石的数据
let getSelectBrick =async function(name){
    let result={ok:0}
    result.brick = await BrickModel.findOne({name:name})
    if(result.brick==null){
        console.log('没找到砖石'+' - '+myDate.toLocaleString())
        return {ok:0}
    }else{
        result.ok=1
        return result
    }
}

//得到现有塔的数据
let getSelectTower =async function(name){
    let result={ok:0}
    result.tower = await TowerModel.findOne({name:name})
    if(result.tower==null){
        console.log('没找到塔'+' - '+myDate.toLocaleString())
        return {ok:0}
    }else{
        result.ok=1
        return result
    }
}

let seeadd = async function(name){
    let result={ok:0}
    result = await TowerModel.findOne({name:name})
    if(result==null){
        console.log('没找到塔,点赞失败'+' - '+myDate.toLocaleString())
        return {ok:0}
    }else{
        await TowerModel.updateOne({name:name},{$inc:{see:1}})
        return {ok:1}
    }
}

let test={
    "orname":"小学数学",
    "name": "小数学",
    "introduce": "工科学习的基石",
    "content": {
        "courses": [
            {
                "name": "张宇高数",
                "introduce": "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
                "jiesuo": "2E6Y",
                "url": "https://baidu.com",
                "updateTime": "2019-10-19",
                "great": 432,
                "label": {
                    "title": "理科",
                    "introduce": "偏理科",
                    "color": "blue"
                }
            }
        ],
        "realDone": [
            {
                "name": "realDone",
                "introduce": "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
                "jiesuo": "2E6Y",
                "url": "https://baidu.com",
                "updateTime": "2019-10-19",
                "great": 431,
                "label": {
                    "title": "理科",
                    "introduce": "内容偏向于理科",
                    "color": "blue"
                }
            }
        ],
        "characters": [],
        "forums": [],
        "tools": [],
        "books": []
    },
    "label": {
        "title": "理科",
        "introduce": "内容偏向于传统理科",
        "color": "blue"
    },
    "front": [
        "高中数学"
    ],
    "behind": [
        "线性代数"
    ]
}
 */

module.exports = new brickHandler()