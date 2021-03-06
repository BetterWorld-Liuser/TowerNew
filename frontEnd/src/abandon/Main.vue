<template>
  <div>
    <div style="position:relative">
      <img
        src="../assets/background_1.png"
        alt=""
        class="mybackground"
      >
      <div class="huany">
        欢迎来到
      </div>
      <div class="tongtianta">
        通天塔
      </div>
      <div class="myname">
        Created by liuss
      </div>
      <div class="items">
        <div style="color:rgba(0,0,0,0.6);margin-left:700px;">
          众塔 >
        </div>
        <div style="color:rgba(64,169,255,100)">
          <a
            class="ta"
            @click="navTo('tower')"
          >塔 ></a>
        </div>
        <div style="color:rgba(255,77,79,100)">
          <a
            class="jiegou"
            @click="navTo('construction')"
          >结构 ></a>
        </div>
        <div style="color:rgba(250,140,22,100)">
          <a
            class="zhuanshi"
            @click="navTo('bricks')"
          >砖石 ></a>
        </div>
        <div style="color:rgba(0,0,0,0.6)">
          沙海 >
        </div>
      </div>
      <a
        class="question"
        href="https://shimo.im/docs/vhTRyG3PTjHx8Vx8/"
        target="_blank"
      >什么是通天塔？</a>
    </div>
  </div>
</template>
<script>
import request from '../request/main'

export default {
  methods:{
    navTo(name){
      this.$router.push(name)
    }
  },
  created(){
    request.getAll()
      .then((res)=>{
        this.$store.commit('refreshBrick',res.bricks)
        this.$store.commit('refreshTower',res.towers)
      })
  }
};
</script>

<style scoped>
.question {
  position: absolute;
  font-weight: bold;
  top: 700px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  right: 150px;
}
.items div {
  font-size: 28px;
  font-weight: bold;
  margin-left: 50px;
}
.items {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  position: absolute;
  top: 600px;
}

.mybackground {
  width: 100%;
}
.huany {
  font-size: 48px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 250px;
  left: 490px;
}
.tongtianta {
  font-weight: bold;
  font-size: 72px;
  color: #41a7fa;
  position: absolute;
  top: 310px;
  left: 660px;
}
.myname {
  font-size: 14px;
  color: rgba(16, 16, 16, 0.6);
  position: absolute;
  top: 410px;
  left: 788px;
}


a {
    text-decoration: none;
    cursor: pointer;
    
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
    text-decoration: none;
}
/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
    text-decoration: none;
}
.ta{
  color:rgba(64,169,255,100);
}
.jiegou{
  color:rgba(255,77,79,100)
}
.zhuanshi{
  color:rgba(250,140,22,100)
}

</style>
