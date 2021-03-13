let { user } = require('./createModel')
let mailer = require('../mail/mailer')

class userHandler {
    //封号检查
    checkIfBlock(userData,i) {
        if(userData<=i)return true;
        return false;
     }
    //检查是否应该封号
    async checkBlock(userData){
        if(userData.dangerEdit>=10&&userData.state!=-Math.floor(userData.dangerEdit/10)){
            await user.updateOne({_id:userData._id},{state:-Math.floor(userData.dangerEdit/10)})
            return true
        }
        return false
    }

    //检查是否应该升级
    async checkUpgrade(userData){
        if(userData.totalEditTimes>=200&&userData.level!=Math.floor(userData.totalEditTimes/200&&userData.totalEditTimes<=1000)){

        }
    }
    //添加一条历史记录
    async addHistoryv2(_id,message){
        await user.updateOne({_id},{$push:{editHistoryv2:{
            message,
            time:new Date().toLocaleString()
        }}})
    }
    //管理员权限检查
    checkManager(userData,i){
        if(userData.level>=i)return true;
        return false;
        
    }
    //获取用户信息
    async findUser(_id){
        let userData = await user.findOne({_id})
        return userData
    }
    //添加新用户
    async addNewUser(email, password) {

        await user.create({
            email,
            password,
            registerTime: new Date().toLocaleString()
        })
    }

    //验证用户名密码
    async checkPassWord(email, password) {
        let res = await user.findOne({ email, password })
        if (res != null) {
            return true
        } else {
            return false
        }

    }

    async checkEmail(email){
        let res = await user.findOne({ email})
        //console.log(res)
        if (res != null) {
            return true
        } else {
            return false
        }
    }
    //修改用户名
    async userChangeName(_id, name) {
        let res = await user.updateOne({ _id }, { $set: { name } })
        if (res.n != 0) {
            return true
        } else {
            return false
        }
    }

    //增加编辑的次数
    async addEditTime(_id) {
        await user.updateOne({ _id }, { $inc: { editTimeDaily: 1,totalEditTimes: 1 } })
    }

    //恢复今天的编辑次数
    async recoverEditoday(){
        await user.updateMany({},{editTimeDaily: 1})
    }

    //某人被举报了
    async dangerEdit(_id) {
        await user.updateOne({ _id }, { $inc: { dangerEdit: 1 } })
    }



}




module.exports = new userHandler()