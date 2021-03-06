import app from '../request/main'

class reqSearch {

    //搜索某个砖石
    async search(name){
        let {data} = await app.get('/search',{
            params:{
                name
            }
        })
        return data.list
    }
    


}

export default new reqSearch()