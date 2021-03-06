<template>
  <div>
    <div class="handler">
      <div
        class="item"
        @click="getHot()"
      >
        最热
      </div>
      <div
        class="item"
        @click="getNew()"
      >
        最新
      </div>
    </div>
    <div class="dataContainer">
      <div class="view">
        <div
          class="card"
          v-for="(item,index) in baseData"
          :key="item._id"
          @click="jumpTo(item)"
        >
          <div class="number bold">
            {{ index+1 }}
          </div>
          <div class="smallTitle">
            {{ item.title }}
          </div>
          <div class="info">
            <div class="like">
              订阅
              <span class="num">{{ item.watchingUser.length }}</span>
            </div>
            <div class="comment">
              模块数
              <span class="num">{{ item.modules==undefined?0:item.modules.length }}</span>
            </div>
            <div class="share">
              浏览历史
              <span class="num">{{ item.seeTimes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reqBrick from '../../request/reqBrick'

export default {
  data() {
    return {
      baseData: [
        {
          _id:"1",
          title: "加载中",
          watchingUser: [],
          modules: [],
          seeTimes: 10
        }
      ]
    };
  },
  methods:{
    async getHot(){
      this.baseData = await reqBrick.getHot()
    },
    async getNew(){
      this.baseData = await reqBrick.getNew()
    },
    jumpTo(item){
      this.$router.push({ name: "brickv3", params: { id: item._id } });
    }
  },
  async created(){
    await this.getHot()
  }
};
</script>

<style lang="less" scoped>
.handler {
  width: 80%;
  display: flex;
  margin-left: 100px;
  .item {
    font-size: 20px;
    font-weight: bold;
    color: #bfbfbf;
    transition: all ease-in-out 0.5s;
    cursor: pointer;
  }
  &:hover {
    .item {
      margin: 0 10px;
      &:hover {
        color: black;
      }
    }
  }
}

.dataContainer {
  width: 100%;
  height: 600px;
  display: flex;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .view {
    width: 90vw;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: white;
    margin: 3rem auto;
    border-radius: 5px;
    min-height: 900px;
    padding: 3rem;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .card {
      width: 70%;
      height: 90px;
      margin: 0 2rem;
      border-radius: 2px;
      box-shadow: 0px 2px 6px 0px #bebebe75;
      position: relative;
      background-color: white;
      margin:10px 0px;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .number{
        position: absolute;
        left: 20px;
        top:18px;
        font-size: 20px;;
      }
      .smallTitle {
        font-size: 1.5rem;
        font-weight: 700;
      }
      .info {
        display: flex;
        flex-direction: row;
        width: 30%;
        justify-content: space-around;
        align-items: center;
        transition: all ease-in-out 0.25s;
      }
      &:hover {
        .info {
          width: 35%;
        }
      }
    }
  }
}

.num {
  font-size: 0.5rem;
}
</style>