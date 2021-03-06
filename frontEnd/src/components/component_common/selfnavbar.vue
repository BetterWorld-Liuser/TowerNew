<template>
  <div style="width:100%">
    <div class="nav">
      <ul>
        <li>
          <a
            class="button"
            @click="urlpush('/')"
          >首页</a>
        </li>
        <li><a @click="urlpush('/dataBase')">数据库</a></li>
        <li><a @click="urlpush('/search')">搜索</a></li>
        <li>
          <a @click="urlpush('/article/5ea06dbc6fa9d76d3afd0bd9')">提建议</a>
        </li>
        <li>
          <a
            class="howToUse"
            @click="urlpush('/article/5e9b55a828490c2f9ebf9066')"
          >如何使用？</a>
        </li>
      </ul>
      <div class="loginState">
        <a
          v-if="loginState == false && this.userEmail == null"
          @click="urlpush('/login')"
        >未登录</a>
        <a
          v-else
          @click="urlpush('/login')"
        >已登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selfnavbar",
  created() {
    let loseToken = localStorage.getItem("loseToken");
    let timeInterval = Math.abs(new Date() - new Date(loseToken));
    if (timeInterval / 1000 / 60 / 60 / 24 <= 6) {
      this.userEmail = localStorage.getItem("userEmail");
    } else {
      this.userEmail = null;
    }
  },
  data() {
    return {
      userEmail: "",
    };
  },
  methods: {
    urlpush(url) {
      this.$router.push(url);
    },
    getEmail() {
      this.userEmail = localStorage.getItem("userEmail");
      return this.userEmail;
    },
  },
  computed: {
    loginState() {
      return this.$store.state.loginState;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  right: 10px;
}

.nav {
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(114, 113, 113, 0.123);
  overflow-x: scroll;
  overflow-y: hidden;
  background-color: white;
  text-align: center;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  font-weight: 400;
  color: #5a5a5a;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    position: relative;
    max-width: 1200px;
    overflow-x: hidden;
    padding: 0;
    margin: 0px;
    li {
      width: 100px;
      margin: 0 0 0 0;
      font-size: 14px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .loginState {
    height: 48px;
    position: absolute;
    right: 10px;
    top: 13px;
  }
}

@media screen and (max-width: 1024px) {
}
</style>
