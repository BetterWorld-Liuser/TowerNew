let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let brick = {
    title:String,
    watchingUser:Array,
    introduce:String,
    like:{type:Number,default:0},
    author:{type:String,ref:"user"},
    modules:[
        {
            name:String,
            level:Number,
            article:{type:Schema.Types.ObjectId,ref:'article'},
            id:{type:String,default:''}
        }
    ],
    lock:{type:Boolean,default:false},
    description:{type:String,default:""},
    seeTimes:{type:Number,default:0},
    editHistory:Array
}

module.exports=brick