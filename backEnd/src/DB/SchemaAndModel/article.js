let mongoose = require("mongoose")
let Schema = mongoose.Schema;
let articleSchema = {
    id:{type:String,default:''},
    title:String,
    topicId:Schema.Types.ObjectId,
    content:{type:String,default:""},
    updateTime:String,
    collaboratorv2:[
        {
            email:String,
            editTimes:{type:Number,default:0}
        }
    ],
    version:{type:String,default:''},
    versionSay:{type:String,default:''},
    like:{type:Number,default:0},
    historyv3:Array,
    creator:{
        type:String,
        default:''
    },
    shareTimes:{type:Number,default:0},
    lock:{type:Boolean,default:false},
    agreement:String
}

let model = mongoose.model('article',articleSchema)

module.exports=model