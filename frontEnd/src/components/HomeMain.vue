<template>
  <div class="container">
    <div class="main">
      <div class="title font60 bold">
        通天塔
      </div>
      <div class="font16">
        v0.4.0
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
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style scoped>
.main {
  width: 80%;
  height: auto;
  color:white;
}
.container {
  display: flex;
  color: black;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 100%;
  text-align: center;
  background:url(../assets/MainBackground.jpg) no-repeat;
  background-size: 100%;
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
  color: rgb(110, 110, 110);
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
</style>
