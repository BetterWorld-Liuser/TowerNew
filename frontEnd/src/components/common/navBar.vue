<template>
  <div
    id="navBar"
    class="firefox bold firefoxShadow font16"
  >
    <div
      id="homeCard"
      class="tCard"
    >
      <div
        class=" button selector"
        @click="urlpush('/')"
      >
        首页
      </div>
      <div
        class="button selector"
        @click="urlpush('/square')"
      >
        搜索
      </div>
      <div
        class="button selector"
        @click="urlpush()"
      >
        介绍
      </div>
      <a
        class="button selector"
        href="https://www.wjx.cn/jq/84849634.aspx"
        target="_blank"
      >反馈</a>
    </div>
    <div
      id="userCard"
      class="tCard"
    >
      <Avataaars style="position:relative;bottom:3px; width:40px;" />
      <div
        class="button selector"
        v-if="!user.userData.loginState"
        @click="urlpush('/login')"
      >
        登录
      </div>
      <div
        class="button selector"
        v-else
        @click="alert('敬请期待')"
      >
        个人中心
      </div>
    </div>
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";
import userObject from "../bricks/UserState"

export default {
  name: "NavBar",
  components: {
    Avataaars,
  },
  created() {
    //登录过期
    this.user.getUserLocalData()
    //console.log(this.searchItem)
  },
  data() {
    return {
      user:new userObject()
    };
  },
  methods: {
    urlpush() {
      this.$router.push({
        name:"brick",
        params:{
          _id:'5e9b4d8828490c2f9ebf9064',
          moduleId:'5e9b558e28490c2f9ebf9065'
        }
      })
    }
  },
  computed: {
  },
};
</script>

<style lang="less" scoped>
#navBar {
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  overflow: auto;
  top: 0px;
  overflow: visible;
  ::-webkit-scrollbar {
    display: none;
  }
  .tCard {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    //box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    height: 50px;
    margin-left: 10px;
    margin-right: 10px;
    
    .selector {
      cursor: pointer;
      text-decoration: none;
      color: black;
      &:hover{
      text-decoration: underline;
    }
    }
  }

  #homeCard {
    width: 20%;
  }
  #brickCard {
    width: 20%;
  }
  #managerCard {
    width: 20%;
  }
  #userCard {
    width: 12%;
  }
  #addCard {
    width: 3%;
    cursor: pointer;
  }
  #searchCard {
    width: auto;
    padding: 0 20px;
    position: relative;
    .searchBar {
      border:none;
      border-bottom:1px solid #e9e9e9;
      position: relative;
      width: 100px;
      height: 70%;
      transition: width ease-in-out 0.5s;
      &:focus {
        width: 200px;
      }
    }
    .searchItem {
      position: absolute;
      top: 60px;
      width: 250px;
      left: 3px;
      min-height: 50px;
      border-radius: 5px;
      background-color: white;
      border: 1px solid #e9e9e9;
      border-top:none;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      .item {
        width: 90%;
        padding: 5px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        color: #5a5a5a;
        &:hover {
          background-color: #e9e9e9;
        }
      }
    }
  }
  #editCard {
    width: 10%;
    div {
      cursor: pointer;
    }
  }
}

</style>
