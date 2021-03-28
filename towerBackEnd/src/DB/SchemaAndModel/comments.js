let mongoose = require("mongoose");

let commentSchema ={
            bindId:String,
            author:{type:String,default:"陌生人"},
            type:String,
            list:[
                {
                    email:{type:String,default:""},
                    content:String,
                    name:String,
                    time:String
                }
            ]
        }
    


module.exports=mongoose.model('comments',commentSchema)