const mongoose = require('mongoose')
/* 
let Brick = require("../Schema/brick")
let Tower = require("../Schema/Tower")
 */

let brickschema = require("../Schema/brick")
let userschema = require("../Schema/user")
let articleschema = require("../Schema/article")
let comments = require("../Schema/comments")
let articleBackupSchema = require("../Schema/articleBackup")
let informationSchema = require('../Schema/information')
let authoritySchema = require("../Schema/authorityTree")

/* 
const BrickModel = mongoose.model("brick",Brick);
const TowerModel = mongoose.model("tower",Tower);
 */

const brick =mongoose.model("brick",brickschema)
const user =mongoose.model("user",userschema)
const article =mongoose.model("articlev3",articleschema)
const comment =mongoose.model("commentv3",comments)
const articleBackup = mongoose.model("articleBackup",articleBackupSchema)
const information = mongoose.model("information",informationSchema)

module.exports = {brick,user,article,comment,articleBackup,information}
