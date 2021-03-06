const mongoose = require('mongoose')
/* 
let Brick = require("../Schema/brick")
let Tower = require("../Schema/Tower")
 */

let brickV3schema = require("./Schema/brickV3")
let userschema = require("./Schema/user")
let articleschema = require("./Schema/article")
let comments = require("./Schema/comments")
let articleBackupSchema = require("./Schema/articleBackup")
let informationSchema = require('./Schema/information')

/* 
const BrickModel = mongoose.model("brick",Brick);
const TowerModel = mongoose.model("tower",Tower);
 */

const brickV3 =mongoose.model("brickV3",brickV3schema)
const user =mongoose.model("user",userschema)
const article =mongoose.model("articlev3",articleschema)
const comment =mongoose.model("commentv3",comments)
const articleBackup = mongoose.model("articleBackup",articleBackupSchema)
const information = mongoose.model("information",informationSchema)

module.exports = {brickV3,user,article,comment,articleBackup,information}
