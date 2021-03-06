<template>
  <div
    style="width:90%;margin:0 auto"
    class="myitem"
  >
    <div>介绍</div>
    <div
      class="change"
      style="float:right"
    >
      <el-button type="text">
        修改
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      introduce: ""
    };
  }
};
</script>

<style>
.change {
  opacity: 0;
}

.myitem:hover .change {
  opacity: 1;
}
</style>
