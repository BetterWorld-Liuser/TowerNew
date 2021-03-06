<template>
  <div class="container">
    <div class="title">
      数据库
    </div>
    <div class="subtitle">
      DataBase
    </div>

    <div class="selector">
      <div
        class="select"
        @click="getThreePara()"
      >
        随便看看
      </div>
      <div
        class="select"
        @click="addBrickVisble=true"
      >
        创建一个砖石
      </div>
    </div>
    <div class="dataContainer">
      <!--             <div class="tools">
              <ul>
                <li>首页</li>
                <li>搜索</li>
                <li>创建一块新的砖石</li>
              </ul>
            </div> -->
      <div class="view">
        <div
          class="card"
          v-for="item in baseData"
          :key="item._id"
          @click="jumpTo(item)"
        >
          <div class="smallTitle">
            {{ item.title }}
          </div>
          <div class="content">
            {{ item.description }}
          </div>
          <div class="info">
            <div class="like">
              关注<span class="num">{{ item.watching }}</span>
            </div>
            <div class="comment">
              模块数<span class="num">{{ item.modules==undefined?0:item.modules.length }}</span>
            </div>
            <div class="share">
              浏览历史<span class="num">{{ item.seeTimes }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="new">
          <div class="newTitle">最新</div>
          <div class="brick">
            <div class="name" @click="toBrick">刷机</div>
            <div class="number">123</div>
          </div>
        </div>
        <div class="hot">
          <div class="hotitle">最热</div>
        </div>
        <div class="someThing"></div> -->
      </div>
    </div>
    <el-dialog
      title="添加砖石"
      :visible.sync="addBrickVisble"
    >
      <el-form :model="form">
        <el-form-item
          label="砖石名称:"
          :label-position="labelPosition"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <button
          class="mybutton cancel"
          @click="addBrickVisble = false"
        >
          取 消
        </button>
        <button
          class="mybutton confirm"
          @click="createBrick"
        >
          确 定
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//import navbar from "../component_common/selfnavbar";
//import request from "../../request/requestV2"


export default {
  created(){
    this.getSome()
  },
  methods: {
    toBrick() {
      this.$router.push({ path: "brick" });
    },
    getThreePara() {
      this.getSome()
    },
    getHotest() {},
    async createBrick() {
      this.addBrickVisble = false;
      let res = await request.createNewBrick(this.form.name)
      this.$router.push(`/brick/${res.res._id}`)
    },
    async getSome(){
      let res = await request.getSomeBrick()
      this.baseData = res.res
    },
    jumpTo(item){
      this.$router.push("/brick/"+item._id)
    }
  },
  data() {
    return {
      labelPosition:"top",
      baseData: [
        {
          title: "站位",
          description: "暂无介绍",
          like: 10,
          comment: 10,
          share: 10,
          id: ""
        }
      ],
      formLabelWidth: "200px",
      addBrickVisble: false,
      form: {
        name: ""
      }
    };
  }
};
</script>

<style scoped>


.search{
  height: 20vh;
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: center;
}
.search input{
 width:70%;
 height: 3rem;
 border-radius: 5px;
 box-shadow: 1px 1px 5px 0px #f5f5f5;
 border:0px;
}
.search button{
 width:20%;
 height: 3rem;
 background-color:#fa541c ;
 margin-left:10px ;
 border-radius: 5px;
 border: 0px;
 color: white;
}

.el-input{
  width:100%;
}

.subtitle{
  width: 100%;
  color: white;
}

.container{
  background:transparent;
    background-attachment: fixed;
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
}

.selector {
  display: flex;
  flex-direction: row;
  margin:0 auto;
  margin-bottom: 20px;
  overflow-x: scroll;
  width: 90vw;
}
.selector::-webkit-scrollbar {
  display: none;
}

.select {
  width: 8rem;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 3px;
  height: 2rem;
  background-color: white;
  line-height: 2rem;
  transition: border 0.5s;
}
.select:hover {
  font-weight: 700;
  border:2px solid #fa8c16;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  top: 12px;
  width: 100%;
  color: white;
}
.dataContainer {
  width: 100%;
  height: auto;
  display: flex;
  overflow: scroll;
}
.dataContainer::-webkit-scrollbar {
  display: none;
}
button {
  cursor: pointer;
}
/* .tools {
  width: 20vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
} */
/* ul li {
  border: 2px solid black;
  border-radius: 3px;
  padding: 1px;
  width: 70%;
  margin-top: 20px;
} */
.view {
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  background-color: white;
  margin:3rem auto;
  border-radius: 5px;
  min-height: 90vh;
  padding:3rem;
}
.view::-webkit-scrollbar {
  display: none;
}



.card {
  width: 25%;
  height: 30vh;
  margin: 0 2rem;
  border-radius: 2px;
  box-shadow: 2px 2px 6px 0px #bebebe75;
  position: relative;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
}

.card .smallTitle {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 1.5rem;
  font-weight: 700;
}

.card .content {
  position: absolute;
  left: 10px;
  top: 3rem;
  font-size: 0.7rem;
  color: rgb(109, 109, 109);
}

.card .info {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 0px;
  align-items: center;
  border-top: 1px solid rgba(114, 113, 113, 0.123);
}
.num {
  font-size: 0.5rem;
}
/* .new {
  min-width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  overflow: scroll;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0 2rem 0 0;
}
.new::-webkit-scrollbar {
  display: none;
}
.hot {
  min-width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  overflow: scroll;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1.7rem;
  font-weight: bold;
  margin-right: 20px;
}
.hot::-webkit-scrollbar {
  display: none;
} */
.brick {
  width: 80%;
  height: 100px;
  border: 2px solid black;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
}
.number {
  position: absolute;
  bottom: 3px;
  right: 3px;
  font-size: 0.7rem;
  font-weight: 500;
}

@media screen and (max-width: 1024px) {
  .dataContainer {
    flex-direction: column;
    align-items: center;
  }
  .tools {
    width: 100%;
    flex-direction: row;
    height: auto;
    justify-content: start;
  }

.card {
  width: 90%;
  height: 30vh;
  border-radius: 2px;
  box-shadow: 2px 2px 6px 0px #f5f5f5;
  margin:0 auto;
  position: relative;
}

  ul {
    display: flex;
    width: 100%;
    overflow-x: scroll;

    padding: 0;
  }

  ul li {
    padding: 5px;
    margin-left: 20px;
    overflow-y: hidden;
    width: auto;
    min-width: 50px;
    height: 30px;
    white-space: normal nowrap;
  }
  .view {
    width: 90vw;
    padding: 5vw 5vw 0 5vw;
    flex-direction: column;
  }
  .someThing {
    min-width: 10px;
  }
}
</style>
