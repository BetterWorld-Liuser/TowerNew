import createVuexAlong from 'vuex-along'

const store = {
  state: {
    bricks: [
      {
        name: "小学数学",
        introduce: "工科学习的基石",
        content: {
          courses: [
            {
              name: "张宇高数",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "理科",
                introduce: "偏理科",
                color: "blue"
              }
            }
          ],
          realDone: [
            {
              name: "realDone",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "理科",
                introduce: "内容偏向于理科",
                color: "blue"
              }
            }
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
          title:"理科",
          introduce:"内容偏向于传统理科",
          color:"blue"
  },
        front: ["高中数学"],
        behind: ["线性代数"]
      },
      {
        name: "初中数学",
        introduce: "工科学习的基石",
        content: {
          courses: [
            {
              name: "张宇高数",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "简单",
                introduce: "课程偏简单",
                color: "blue"
              }
            }
          ],
          realDone: [
            {
              name: "realDone",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "理科",
                introduce: "内容偏向于理科",
                color: "blue"
              }
            }
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
            title:"理科",
            introduce:"内容偏向于传统理科",
            color:"blue"
    },
        front: ["高中数学"],
        behind: ["线性代数"]
      },
      {
        name: "高中数学",
        introduce: "工科学习的基石",
        content: {
          courses: [
            {
              name: "张宇高数",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "简单",
                introduce: "课程偏简单",
                color: "blue"
              }
            }
          ],
          realDone: [
            {
              name: "realDone",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "理科",
                introduce: "内容偏向于理科",
                color: "blue"
              }
            }
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
            title:"理科",
            introduce:"内容偏向于传统理科",
            color:"blue"
    },
        front: ["高中数学"],
        behind: ["线性代数"]
      },
      {
        name: "大学数学",
        introduce: "工科学习的基石",
        content: {
          courses: [
            {
              name: "张宇高数",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "简单",
                introduce: "课程偏简单",
                color: "blue"
              }
            }
          ],
          realDone: [
            {
              name: "realDone",
              introduce:
                "这是一段乱七八糟没有意义的介绍，至于为什么要有这一段介绍，就是为了当事人可以很方便地了解到 这个教程是否适合他",
              jiesuo: "2E6Y",
              url: "https://baidu.com",
              updateTime: "2019-10-19",
              great: 431,
              label: {
                title: "理科",
                introduce: "内容偏向于理科",
                color: "blue"
              }
            }
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
            title:"理科",
            introduce:"内容偏向于传统理科",
            color:"blue"
    },
        front: ["高中数学"],
        behind: ["线性代数"]
      }
       
    ],
    towers: [ {
      "name": "数学",
      "introduce": "数学是通向世界真理的必经之路。",
      "updateTime": "2020-1-31",
      "see": 31,
      "brickList": [{
          "items":["小学数学","大学数学"],
          "introduce":"第一层通常是一些非常基础的学科，有些学科甚至看似与本塔无关，但实则非常重要。"
      },{
          "items":["初中数学","初中物理"],
          "introduce":"第二层通常是一些非常基础的学科，有些学科甚至看似与本塔无关，但实则非常重要。"
      }]
      
  } ],
    selectBrick: {
       name: "高等数学",
      introduce: "工科学习的基石",
      content: {
        courses: [],
        realDone: [],
        characters: [],
        forums: [],
        tools: [],
        books: []
      },
      label: {
        title:"理科",
        introduce:"内容偏向于传统理科",
        color:"blue"
},
      front: [],
      behind: []
     },
    selectTower: {
       "name": "数学",
      "introduce": "数学是通向世界真理的必经之路。",
      "updateTime": "2020-1-31",
      "see": 31,
      "brickList": [{
          "items":["小学数学","大学数学"],
          "introduce": "数学是通向世界真理的必经之路。"
      }]
      
  },
  loginState:false,
  dragOpen:false
  },
  mutations: {
    changeLoginState(state){
      state.loginState  = true
    },

    //切换砖石的状态,切换到对应名字的砖石上
    changeBrickState(state, name) {
      let result=0
      for(let item of state.bricks){
        if(item.name == name){
          state.selectBrick=item
          result=1
        }
      }
      if(result==0){
        console.log('在切换砖石状态的时候出现意外')
      }
    },
    //切换选择塔的状态，切换到对于名字的塔上
    changeTowerState(state, name) {
      let res=0
      for(let item of state.towers){
        if(item.name == name){
          state.selectTower=item
          res=1
        }
      }
      if(res==0){
      
          console.log('在切换塔状态的时候出现意外')
        
      }
    },
    //添加砖石,默认无冲突
    addBrick(state,form){
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
      state.bricks.push(brick)
    },

    //向塔中添加砖石，默认塔中没有重复砖石
    addBrickToTower(state,poly){
      let res=0
      for(let tower of state.towers){                                          
        if (tower.name == poly.name){
          tower.brickList[poly.index-1].items.push(poly.brickname)
          res=1
        }
      }
      if(res==0){
        console.log('在addBrickToTower中没找到塔的存在')
      }
    },

    //向塔中添加一层
    addFloor(state,data){
      let name = data.name
      let floor={
        items:[],
        introduce:data.introduce
    }
      for(let i = 0;i<state.towers.length;i++){
        if(state.towers[i].name == name){
          state.towers[i].brickList.push(floor)
          break
        }
      }
      this.commit('changeTowerState',name)
    },

    //向现在选择的塔中添加砖石
    addBrickToselectTower(state,poly){
      if(state.selectTower.name == poly.name){
        state.selectTower.brickList[poly.index-1].items.push(poly.brickname)
      }else{
        console.log('在添加给现有塔内容时发生了错误，名字没对上')
      }
    },

    //修改塔中砖石的层数和名称并刷新现有塔的状态
    changeTowerItemName(state,data){
      //原name
      let name = data.name
      //修改砖石的index
      let reindex = data.index-1
      //要修改的name
      let rename = data.rename

      if(rename==''){rename=name}

      for(let tower of state.towers){
        if(tower.name == state.selectTower.name){
          for(let ceng=0;ceng<tower.brickList.length;ceng++){
            for(let i=0;i<tower.brickList[ceng].items.length;i++){
              if(tower.brickList[ceng].items[i] == name){
                tower.brickList[ceng].items.splice(i,1)
              }
            }
            if(ceng==reindex){
              tower.brickList[ceng].items.push(rename)
            }

          }          
        
          break

        }
      }
      //刷新现选塔的状态
      this.commit('changeTowerState',state.selectTower.name)
    },

    //修改砖石名字，介绍和标签
    changeBrick(state,data){
      //原来砖石的名字
      let name = data.name
      //修改砖石的名字
      let rename = data.rename
      //修改砖石的介绍
      let introduce = data.introduce
      //修改砖石的标签
      let label = data.label
      //找到砖石，修改其名称和标签
      for(let i=0;i<state.bricks.length;i++){
        //找到砖石并修改其名字
        if(state.bricks[i].name == name){
          if(rename==''){rename=name}
          state.bricks[i].name = rename
          state.bricks[i].introduce = introduce
          state.bricks[i].label = label
          break
        }
      }

    },

    //添加塔
    addTower(state,tower){
      state.towers.push(tower)
    },

    //将现有状态合并到塔堆中
    mergetower(state){
      let name=state.selectTower.name
      for(let i=0;i<state.towers.length;i++){
        if (state.towers[i].name==name){
          state.towers[i] = state.selectTower
        }
      }
    },

    //将现有状态合并到砖石堆中 
    mergebrick(state){
      let name=state.selectBrick.name
      for(let brick of state.bricks){
        if (brick.name==name){
          brick = state.selectBrick
        }
      }
    },


    //塔的关注度增加
    TowerSeeadd(state){
      state.selectTower.see+=1
      console.log("看的次数增加了")
    },

    //给砖石添加卡片
    addCardToBrick(state,card){
      //卡片的名字
      let name = card.name
      //卡片的介绍
      let introduce =card.introduce
      //卡片的label
      let label = card.label
      //卡片的更新时间
      let updateTime = card.updateTime
      //卡片的解锁码
      let jiesuo = card.jiesuo
      //卡片的url
      let url = card.url
      //选择卡片的状态
      let contentState = card.contentState
      let model ={
        name: name,
              introduce:
                introduce,
              jiesuo: jiesuo,
              url: url,
              updateTime: updateTime,
              great: 0,
              label: label
      }
      state.selectBrick.content[contentState].push(model)
    },

    //修改砖石卡片
    changeCard(state,card){

      let name = card.name
      let rename = card.rename
      //卡片的介绍
      let introduce =card.introduce
      //卡片的label
      let label = card.label
      //卡片的更新时间
      let updateTime = card.updateTime
      //卡片的解锁码
      let jiesuo = card.jiesuo
      //卡片的url
      let url = card.url
      //选择卡片的状态
      let contentState = card.contentState

      let model ={
              name: rename,
              introduce:introduce,
              jiesuo: jiesuo,
              url: url,
              updateTime: updateTime,
              great: 0,
              label: label
      }
      
      for(let i=0;i<state.selectBrick.content[contentState].length;i++){
        if(state.selectBrick.content[contentState][i].name == name){
          
          state.selectBrick.content[contentState][i] = model
          break
      }
    }
    },

    //给现有砖石添加结构
    addconstruction(state,data){
      //添加砖石的名称
      let name = data.name
      //添加砖石的位置
      let position = data.position
      state.selectBrick[position].push(name)


    },

    //修改现有砖石的结构
    changeconstruction(state,data){
      if(data.rename==''){data.rename=data.name}
      for(let i=0;i<state.selectBrick.front.length;i++){
        if(data.name==state.selectBrick.front[i]){
          if(data.position == 'front'){return}
          else{state.selectBrick.behind.push(data.rename)
            state.selectBrick.front.splice(i,1)
            return
          }
          
        }
      }
      for(let i=0;i<state.selectBrick.behind.length;i++){
        if(data.name==state.selectBrick.behind[i]){
          if(data.position == 'behind'){return}
          else{state.selectBrick.front.push(data.rename)
            state.selectBrick.behind.splice(i,1)
            return
          }
          
        }
      }
    },

    //刷新现有砖石堆状态
    refreshBrick(state,data){
      state.bricks = data
    },

    //刷新现有塔堆的状态
    refreshTower(state,data){
      state.towers = data
    },

    //刷新现有砖石状态
    refreshSelectBrick(state,data){
      state.selectBrick = data
    },

    //刷新现有塔的状态
    refreshSelectTower(state,data){
      state.selectTower = data
    }
    
  },
  plugins:[createVuexAlong()]
  /* plugins:[createVuexAlong()] */
};

export default store;
