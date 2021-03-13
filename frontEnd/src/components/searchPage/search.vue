<template>
  <div class="main ">
    <div class="search-bar">
      <div class="searchTool bdrd5">
        <input
          type="text"
          id="search"
          class="font16 bold"
          placeholder="搜索砖石"
          v-model="searchInput"
        >
        <div class="addTool">
          <el-tooltip
            class="tips"
            effect="dark"
            content="添加砖石"
            placement="bottom"
          >
            <div
              class="addBrick"
              @click="addBrick()"
            >
              <i class="el-icon-s-promotion" />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div
        class="searchPanel bdrd5 flexColumn "
        v-show="searchShow"
      >
        <div
          class="searchTips font16 bold"
          v-show="searchRes.length==0"
        >
          未搜索到结果...
        </div>
        <div
          class="item font16 bdrd5 bold"
          v-for="el in searchRes"
          :key="el._id"
          @click="goto(el._id)"
        >
          {{ el.title }}
        </div>
      </div>
    </div>
    <div class="selectField flexRow flexCenter bgf9">
      <el-radio-group v-model="select">
        <el-radio-button label="最热100" />
        <el-radio-button label="最新100" />
      </el-radio-group>
    </div>
    <div class="brick-list flexRow bgf9">
      <div
        class="brickItem bdrd5 marginAround10"
        v-for="item in brickList"
        :key="item._id"
        @click="goto(item._id)"
      >
        <div class="title font16 bold">
          {{ item.title }}
          <i class="el-icon-d-arrow-right titlego" />
        </div>
        <div class="detile flexRow">
          <div class="like">
            订阅
            <span class="num">{{ item.watchingUser.length }}</span>
          </div>
          <div class="comment">
            模块数
            <span class="num">{{
              item.modules == undefined ? 0 : item.modules.length
            }}</span>
          </div>
          <div class="share">
            浏览历史
            <span class="num">{{ item.seeTimes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import navself from "../component_common/selfnavbar";
import reqBrick from '../../request/reqBrick';

export default {
  data() {
    return {
      
      brickListHot: [
        {
          _id: 1,
          title: "加载中",
          watchingUser: [],
          modules: [],
          seeTimes: 10,
        }
      ],
      select:"最热100",
      brickListNew:[{
          _id: 1,
          title: "加载中",
          watchingUser: [],
          modules: [],
          seeTimes: 10,
      }],
      searchInput:"",
      brickSearchBase:[]
    };
  },
  created(){
    this.initData();
  },
  methods: {
    async initData(){
      this.brickListHot =await reqBrick.getOneHundredHot();
      this.brickListNew= await reqBrick.getOneHundredNew();
      this.brickSearchBase = await reqBrick.getBrickList();
    },
    goto(id){
      this.$router.push({ name: "brickv3", params: { id: id } })
    },
    async addBrick(){
      if (this.loginState == false) {
        alert("创建砖石需要登录");
        return;
      }
      let r = prompt("请输入砖石的名字");
      if (!r) {
        alert("请输入砖石的名称");
        return;
      }
      let data = await reqBrick.createNewBrick(r);
      alert(data.message);
      this.$router.push({ name: "brickv3", params: { id: data.id } });
    }
  },
  computed:{
    brickList(){
      if(this.select=="最热100"){
        return this.brickListHot
      }else{
        return this.brickListNew
      }
    },
    searchShow(){
      if(this.searchInput==""){
        return false;
      }else{
        return true
      }
    },
    searchRes(){
      if(this.searchInput==""||this.brickSearchBase==[]){
        return []
      }else{
        let res = this.brickSearchBase.filter((el) => {
        let re = new RegExp(this.searchInput, "i");
        return el.title.match(re);
      });
        return res;
      }
    },
    loginState() {
      return this.$store.state.loginState;
    },
  }
};
</script>

<style scoped lang="less">

.main{
  background:url(../../assets/background-2.jpg) no-repeat;
}
.search-bar {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position:relative;
  .searchTool {
    width: 600px;
    height: 41px;
    box-shadow: 0 4px 6px rgba(0,0,0,.18),0 2px 4px rgba(0,0,0,.1);
    background-color: white;
    input {
      width: 500px;
      height: 40px;
      border: none;
      outline: none;
      margin-left: 5px;
    }
  }
  .addTool{
    width:600px;
    position:absolute;
    top:140px;
    height:40px;
    .addBrick{
      background-color: white;
      width:30px;
      height:30px;
      border-radius: 15px;
      position:relative;
      cursor:pointer;
      .el-icon-s-promotion{
        position:absolute;
        top:8px;
        left:8px;
        color:#bfbfbf;
      }
      &:hover{
        .el-icon-s-promotion{
          color:black;
        }
      }
    }
  }

  .searchPanel {
    width:600px;
    min-height:100px;
    max-height: 400px;
    overflow-y:scroll;
    scrollbar-width: none;
    position:absolute;
    background-color: white;
    top:125px;
    z-index: 2;
    .searchTips{
      line-height: 50px;
      color:#8c8c8c;
      margin:25px auto;
    }
    .item{
      width:100%;
      height:40px;
      padding:0 20px;
      line-height:40px;
      cursor: pointer;
      &:hover{
        background-color:#ECECEC ;
      }
    }
    &::-webkit-scrollbar{
      display:none;
    }
  }
}
.selectField{
  width:100%;
  height:100px;
}
.brick-list{
  width:100%;
  min-height: 800px;
  padding:0px 20px 50px 20px;
  flex-wrap: wrap;
  justify-content: center;
  .brickItem{
    width:280px;
    height:auto;
    padding:10px 10px 10px 10px;
    background-color: white;
    transition:all 0.5s ease-out;
    position:relative;
    cursor: pointer;
    .title{
      min-height:25px;
      .titlego{
        float:right;
        height:25px;
        width:25px;
        line-height: 25px;
        color:#E2E3E7;
      }
    }
    .detile{
      height:25px;
      justify-content: space-between;
      color:#7F758D;
    }
    &:hover{
      
      transform:translateX(5px);
      box-shadow: 0 0 1px 0px rgba(29, 17, 51, .04), 0 0 3px 2px rgba(9, 32, 77, .12), 0 0 2px -3px rgba(29, 17, 51, .12);
      .title{
        color:#f5222d;
        .titlego{
          color:black;
        }
      }
    }
  }
}
</style>
