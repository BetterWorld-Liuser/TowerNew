<template>
  <div>
    <el-divider />
    <div class="title">
      一些网站和工具(友情推荐)
    </div>
    <div class="list">
      <a href="https://u.tools">Utools</a>
    </div>
  </div>
</template>
u.tools
<script>
export default {

}
</script>

<style scoped>
.title{
    width:100%;
    height: 20px;
    font-size:20px;
    font-weight: bold;
    text-align: left;
}
.list{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 50px;
}
a{
    margin-top:20px;
    margin-left:10px;
}

a:visited{
    color: rgba(64,169,255,100);
}

a:link{
    color:rgba(0,0,0,0.5);
}
a:hover{
    color:rgba(255,77,79,100);
}
</style>