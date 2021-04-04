const {user} = require('../createModel')



/**检查管理员权限
 *
 *
 * @param {*} email
 * @returns
 */
let checkIfAdmin = async (email)=>{
    let res = await user.findOne({email})
    if(res.level==10){
        return true
    }else{
        return false
    }
}


let adminMethod={
    checkIfAdmin
}


module.exports = adminMethod