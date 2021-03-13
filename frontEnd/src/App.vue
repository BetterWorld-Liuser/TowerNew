<template>
  <div
    id="app"
    class="flexColumn"
  >
    <navBar />
    <transition name="slide-fade">
      <router-view />
    </transition>
    <recordInfo />
  </div>
</template>

<script>
import navBar from "./components/common/navBar";
import recordInfo from "./components/common/recordInfo";
export default {
  name: "App",
  components: {
    navBar,
    recordInfo
  }
};
</script>

<style lang="less">

#app {
  min-width:1440px;
  min-height: 960px;
  margin:auto 0;
}

input{
  outline: none;
}



</style>
