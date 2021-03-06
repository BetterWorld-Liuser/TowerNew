let mongoose = require("mongoose")
let Schema = mongoose.Schema;
let articleBackup = {
    bindId:Schema.Types.ObjectId,
    contentArray:[
        {
            time:String,
            content:String
        }
    ]
}

module.exports=articleBackup