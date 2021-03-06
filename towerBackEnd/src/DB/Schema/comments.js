let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let comments ={
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
    


module.exports=comments