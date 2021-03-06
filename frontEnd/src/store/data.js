import createVuexAlong from 'vuex-along'
//import reqArticle from '../request/reqArticle'
import reqArticle from '../request/reqArticle'
const store = {
  state: {
  dragOpen:false,
  selectNodeId:"",
  homeCard:true,
  managerCard:false,
  userCard:true,
  addCard:true,
  editCard:false,
  editContent:"",
  loginState:false,
  email:"",
  editId:"",
  editVersion:""
  },
  mutations: {
    openDrag(state){
      state.dragOpen=true
    },
    closeDrag(state){
      state.dragOpen=false
    },
    selectNode(state,id){
      state.selectNodeId=id
    },
    syncContext(){
      console.log('sync')
    },
    openEditCard(state){
      state.editCard=true
    },
    closeEditCard(state){
      state.editCard=false
    },
    Login(state){
      state.loginState=true
    },
    noLogin(state){
      state.loginState=false
    },
    syncArticle(state,data){
      state.editContent = data.md
      state.editId = data.articleId
      if(data.version){
        state.editVersion = data.version
      }else{
        state.editVersion = ''
      }
    },
    async postArticle(state){
      state.editCard=false
      let res = await reqArticle.changeArticle(state.editId,state.editContent,state.editVersion)
      alert(res)
      window.history.back(-1);
      //await reqArticle.changeArticle(_id,email,content,version,oldversion)
    }



  },
  plugins:[createVuexAlong()]
  /* plugins:[createVuexAlong()] */
};

export default store;
