<template>
  <div class="container">
    <div class="main">
      <div class="title font60 bold">
        通天塔
      </div>
      <div class="font16">
        v0.4.1
      </div>
      <div class="subtitle font20">
        通天塔是一个可供所有人编辑和学习的学习指南
      </div>
      <div class="introduce font18">
        我们在试图汇聚世界上最好的资源，让所有人都有机会站在巨人的肩膀上，创造和实现更多的东西
      </div>
      <div class="introduceEnglish font18">
        We are trying to bring together the best resources in the world so that
        everyone has the opportunity to stand on the shoulders of giants, so to
        create and achieve more.
      </div>
      <div class="author">
        Create By liu
      </div>
    </div>
    <div class="infoBar flexRow font18">
      <div>今日访问新增{{ info.visitToday }}</div>
      <div>今日砖石新增{{ info.brickNew }}</div>
      <div>今日用户新增{{ info.userNew }}</div>
      <div>今日模块新增{{ info.articleNew }}</div>
      <div>总访问数{{ info.visit }}</div>
      <div>砖石总数{{ info.brickNumber }}</div>
      <div>用户总数{{ info.userNumber }}</div>
      <div>文章总数{{ info.articleNumber }}</div>
    </div>
  </div>
</template>

<script>
import app from '../newRequest/main'
export default {
  data(){
    return{
      info:{}
    }
  },
  methods:{
  },
  async created() {
    let {data} = await app.get('/mainpage/getInfo')
    this.info = data.res
  },
};
//今日访问量 
//今日砖石新增
//今日用户新增
//今日模块新增

//总访问量
//砖石总量
//总用户数量
//模块总数
</script>

<style scoped>

.container {
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 100%;
  text-align: center;
  background:url(https://picgoliuzhengdong.oss-cn-shanghai.aliyuncs.com/img/MainBackground.jpg) no-repeat;
  background-size: 100%;
}

.main {
  width: 80%;
  height: auto;
  color:white;
}
.title {
  animation: twinkling 1s ease-in-out 1;
  animation-fill-mode: backwards;
  line-height:60px;
}
.subtitle {
  margin-top: 2rem;
  margin-bottom: 4rem;
  font-weight: bold;

  animation: twinkling 1s ease-in-out 0.7s 1;
  animation-fill-mode: backwards;
}
.introduce {
  width:100%;
  animation: twinkling 1s ease-in-out 1s 1;
  animation-fill-mode: backwards;
}
.introduceEnglish {

  width: 70%;
  margin: 1rem auto;
  animation: twinkling 1s ease-in-out 1s 1;
  animation-fill-mode: backwards;
}
.author {
  float: right;
  position: relative;
  right:150px;
  font-size: 1rem;
  color: rgb(255, 255, 255);
  margin-top: 2rem;
  animation: twinkling 1s ease-in-out 2.5s 1;
  animation-fill-mode: backwards;
}

@keyframes twinkling {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.infoBar{
  width: 80%;
  height: auto;
  color:white;
  margin-top:50px;
  justify-content: space-around;
}

</style>
