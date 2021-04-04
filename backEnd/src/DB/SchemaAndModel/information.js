const  mongoose  = require("mongoose")

let info = {
    visitToday:{type:Number,default:0},
    userNew:{type:Number,default:0},
    brickNew:{type:Number,default:0},
    articleNew:{type:Number,default:0},

    visit:{type:Number,default:0},
    userNumber:{type:Number,default:0},
    brickNumber:{type:Number,default:0},
    articleNumber:{type:Number,default:0}
}

module.exports = mongoose.model('info',info)