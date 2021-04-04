let mongoose = require('mongoose')
let authoritySchema = {
    authoritys:[
        {
            name:String,
            authorityArr:Array
        }
    ]
}

module.exports = mongoose.model('authority',authoritySchema)