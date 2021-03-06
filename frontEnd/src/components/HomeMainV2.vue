<template>
  <div class="container">
    <!-- <nav>
      <ul>
        <li><a href="/HomeV2">首页</a></li>
        <li><a href="/dataBase">资料库</a></li>
        <el-tooltip class="item" effect="dark" content="暂未开放" placement="right-start">
        <li><a href="/HomeV2">搜索</a></li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="暂未开放" placement="right-start">
        <li><a href="/HomeV2">提需求</a></li>
        </el-tooltip>
      </ul>
    </nav> -->
    <div class="main">
      <div class="title">
        通天塔
      </div>
      <small>v0.3.0</small>
      <div class="subtitle">
        通天塔是一个可供所有人编辑和学习的学习指南。
      </div>
      <div class="introduce">
        我们在试图汇聚世界上最好的资源，让所有人都有机会站在巨人的肩膀上，创造和实现更多的东西。
      </div>
      <div class="introduceEnglish">
        We are trying to bring together the best resources in the world so that
        everyone has the opportunity to stand on the shoulders of giants ,so to
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
  created(){
  }
};
</script>

<style scoped>


.main{
    width:50vw;
    height: 50vh;
}
.container{
    display:flex;
    color:black;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background-image: url("https://s1.ax1x.com/2020/04/15/JC4kIH.jpg"); */
    background-attachment: fixed;
    background-size: 100vw auto;
    background-repeat: no-repeat;
    width: 100%;
    text-align: center;
   /*  font-family: sans-serif; */
}
/* nav {
  position: absolute;
  overflow: hidden;
  left:10px;
  width: 15vw;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
}
nav ul {
  position: relative;
  right: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
nav ul li{
    margin: 1rem;
    font-size: 1.2rem;
    text-decoration: none;
    text-align: center;
    color:black;
    animation: twinkling 1s ease-in-out 2s 1;
    animation-fill-mode: backwards;
    border-radius: 2px;
    border:2px solid;
    overflow: hidden;
    padding: 2px 5px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
nav ul li:hover{
    font-weight: bold;
} */
.title {
  font-size: 3rem;
  font-weight: bold;
  animation: twinkling 1s ease-in-out 1;
  animation-fill-mode: backwards;
  /* color:white; */
  
}
.subtitle {
  margin-top: 2rem;
  margin-bottom: 4rem;
  font-weight: bold;
  animation: twinkling 1s ease-in-out 0.7s 1;
  animation-fill-mode: backwards;
  /* color:white; */
}
.introduce {
  font-size: 0.8rem;
  animation: twinkling 1s ease-in-out 1s 1;
  animation-fill-mode: backwards;
  /* color:white; */
}
.introduceEnglish {
  font-size: 0.8rem;
  width: 40vw;
  margin:1rem auto;
  animation: twinkling 1s ease-in-out 1s 1;
  animation-fill-mode: backwards;
  /* color:white; */
  
}
.author{
    float: right;
    font-size:0.75rem;
    color:rgb(110, 110, 110);
    margin-top:2rem;
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
@media screen and (max-width: 1128px){
  .container{
    background-size: 100vw auto;
  }
    /* nav{
        position: relative;
        left: 0;
        top:0;
        width: 100vw;
        order:2;
        height: 40px;
        display: flex;
        align-items: center;
        flex-direction: row;
        
    }
    nav ul{
        margin:0;
        padding: 0;
        right: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        
    }
    nav ul li{
        display: inline;
        margin: 1rem;
    } */
    .main{
        order:1;
    }
    }

</style>
