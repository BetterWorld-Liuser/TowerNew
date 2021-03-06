let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//level10是管理员
let user={
    name:{type:String,default:'陌生人'},
    article:[
        {
            type:Schema.Types.ObjectId,ref:'articles'
        }
    ],
    email:String,
    password:String,
    totalEditTimes:{type:Number,default:0},
    state:{type:Number,default:1},
    like:[{type:Schema.Types.ObjectId,ref:'articles'}],
    level:{type:Number,default:1},
    experience:{type:Number,default:0},
    editTimeDaily:{type:Number,default:0},
    dangerEdit:{type:Number,default:0},
    editHistory:[
        {
            para:{type:Schema.Types.ObjectId,ref:'articles'},
            article:String,
            time:String
        }
    ],
    editHistoryv3:Array,
    registerTime:String
}

module.exports = user