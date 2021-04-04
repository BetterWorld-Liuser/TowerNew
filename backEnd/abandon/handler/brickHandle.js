
let { brick } = require('../model/createModel')


class brickHandler {


    //获得砖石列表
    async getBrickList(){
        return await brick.find({},{_id:1,title:1})
    }

}

module.exports = new brickHandler()