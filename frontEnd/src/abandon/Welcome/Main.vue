<template>
  <div class="welcome">
    <h1 style="color:red;letter-spacing: 5px;">
      欢迎来到通天塔
    </h1>

    <p
      style="position:relative;left:200px"
      class="question"
    >
      那么这里有什么呢？
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.question {
  opacity: 0;
  transition: all 0.5s ease-in-out;
  font-family: "华文行楷";
  font-size: 20px;
  letter-spacing: 5px;
}

.welcome:hover .question {
  opacity: 1;
}
</style>
