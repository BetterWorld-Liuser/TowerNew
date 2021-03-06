const Axios = require('axios')

let app =new Axios.create({
    baseURL: 'http://47.100.193.107:7865',
    timeout:7000,
    headers: {'X-Custom-Header': 'stranger',
            "Content-Type":"application/json"
        }
})
//遇到同时传入数据的怎么办

//1.得到全部数据
let getAll =async function(){
    let res ={}
    res = await app.get('/api/getall')
    return res.data
}

//2.添加砖石得到ok
let addbrick =async function(data){
    let res= await app.post('api/addbrick',{
        brick:data
    })
    return res.data
}

//3.添加塔，得到ok
let addTower =async function(data){
    let res = await app.post('api/addtower',{
        tower:data
    })
    return res.data
}

//4.修改砖石，传入要更改的砖石的数据ok
let changebrick =async function(data){
    let res= await app.post('api/changebrick',{
        changebrick:data
    })
    return res.data
}

//5.修改塔，传入要更改塔的数据ok
let changetower =async function(data){
    let res= await app.post('api/changetower',{
        changetower:data
    })
    return res.data
}

//6.得到现有塔的数据
let getSelectTower =async function(name){
    
    let res = await app.get('/api/selectTower',{
        params:{
            name:name
        }
    })
    
    return res.data
}

//7.得到现有砖石的数据
let getSelectBrick =async function(name){
    let res = await app.get('/api/selectBrick',{
        params:{
            name:name
        }
    })
    
    return res.data
}

let seeadd =async function(name){
    let res = await app.get('/api/seeadd',{
        params:{
            name:name
        }
    })
    return res
}

let addbrickByform = async function(form){
    let brick ={
        name: form.name,
        introduce: form.introduce,
        content: {
          courses: [
          ],
          realDone: [
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
          title: form.label.title,
          introduce: form.label.introduce,
          color: form.label.color
        },
        front: [],
        behind: []
      }
    addbrick(brick)
}




let request={
    getAll,
    addTower,
    addbrick,
    changebrick,
    changetower,
    getSelectTower,
    getSelectBrick,
    addbrickByform,
    seeadd
}

module.exports=app