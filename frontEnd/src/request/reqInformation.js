import app from '../request/main'

class reqInfo {

    //增加今日访问量
    async addvisitToday(){
        await app.get('/statistics/addvisitToday')
    }
    //增加一个砖石
    async addBrick(name){
        await app.post('/statistics/addBrick',{name})
    }

    //增加用户数量
    async addUser(){
        await app.get('/statistics/addUser')
    }

    //获得数据
    async getSearchItem(){
        let {data} = await app.get('/info/getSearchItem')
        return data.res.brickList
    }

    async getInfo(){
        let {data} = await app.get('/info/getInfo')
        return data
    }
}
export default new reqInfo()