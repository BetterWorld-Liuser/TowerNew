<template>
  <div>
    <div class="title">
      Markdown编辑模式
    </div>
    <textarea
      class="editor"
      contenteditable="true"
      spellcheck="true"
      v-model="content"
    />
    <div class="handle">
      <div
        class="confirmMk"
        @click="save()"
      >
        确认保存
      </div>
      <div
        class="cancelMk"
        @click="backtohtml"
      >
        取消编辑
      </div>
    </div>
    <div
      id="content"
      v-html="convertHtml"
    />
  </div>
</template>

<script>
import marked from 'marked'
import request from "../../../request/requestV2"
/* import '../../../assets/gitlab.css' */
/* import 'highlight.js/styles/vs2015.css' */
//import $ from 'jquery'

//添加聊天节点函数
/* document.onmousedown = function(e){
  console.log(e.pageX)
  let talkPoint =  document.createElement('div')
  
  talkPoint.classList.add('talkPoint')
  talkPoint.style.left = e.pageX+'px'
  talkPoint.style.top = e.pageY +'px'
  console.log(talkPoint.style)
  document.body.appendChild(talkPoint)

  //console.log($('.talkPoint').css({left:e.pageX,top:e.pageY}))
} */
export default {
  name: "App",
  data(){
    return{
      content:"",
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    backtohtml(){
      this.$router.push("/article/"+this.$route.params.id)
    },
    async save(){
      let res = await request.changePara(this.$route.params.id,this.content)
      if(res.ok==1){
        this.$notify({
          title: '成功',
          message: '成功修改，即将跳转',
          type: 'success'
        });
        setTimeout(() => {
          this.$router.push("/article/"+this.$route.params.id)
        }, 3000);
      }else{
        this.$notify({
          title: '失败',
          message: '对不起，修改失败，即将跳转',
          type: 'warning'
        });
        setTimeout(() => {
          this.$router.push("/article/"+this.$route.params.id)
        }, 3000);
      }
    },
    async fetchData(){
      
      let res = await request.getPara(this.$route.params.id)
      //console.log(res.para.content)
      this.content = res.res.content

    }
    
  },

  computed:{
    convertHtml:function(){
      return marked(this.content)
    }
  }
};
</script>

<style scoped>


pre{
  border-radius: 5px;
}

#content{
  width: 85vw;
  margin: auto;
  text-align: start;
}
.handle{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top:10px;
}
.title{
  text-align: center;
  font-size:20px;
  font-weight: bold;
  padding-bottom: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.editor::-webkit-scrollbar {
  width:7px;
  background-color: white;
  cursor: pointer;
}
.editor::-webkit-scrollbar-thumb {
  background-color: rgb(106, 107, 107);
  border-radius: 5px;
  cursor: pointer;
}
.editor::-webkit-scrollbar-button {
  display: none;
}
.editor::-webkit-scrollbar-track {
  display: none;
}
.editor::-webkit-scrollbar-track-piece {
  display: none;
}
.editor{
  width: 85vw;
  height: 70vh;
  overflow-y: scroll;
  padding: 5px;
  margin:auto;
  border:2px solid;
  border-radius: 3px;
  resize: none;
  display:block;
}
.confirmMk{
  display: inline-block;
  margin:3px 30px 0px 0px;
  padding:5px;
  border:2px solid;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
}
.cancelMk{
  display: inline-block;
  margin:3px 0px 0px 30px;
  padding:5px;
  border:2px solid;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
}

</style>
