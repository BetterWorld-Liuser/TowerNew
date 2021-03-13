const {user} = require('./createModel')
let leve_1 = require("./leveLimit")

/**检查是否封号，限制次数是否达到
 *
 *
 * @param {*} _id
 * @param {*} level
 * @returns
 */
let check = async function(_id){
 let res = await user.findOne({_id})
 if(res.state==1 && res.editTimeDaily<=leve_1.editDaily){
     return true
 }else{
     return false
 }

}


let checkLimit = async function(_id){

}