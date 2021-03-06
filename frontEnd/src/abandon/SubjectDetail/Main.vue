<template>
  <div style="width:1200px;margin:0 auto;">
    <div
      class="grid-content bg-purple"
      style="width:850px;margin:0 auto;"
    >
      <div
        style="font-size:27px;font-weight:700;margin:20px 0 20px 0;padding-top:20px"
      >
        {{ this.title }}
      </div>
      <div style="margin:0 auto;">
        <el-tabs
          v-model="activeName"
          style="width:90%;display:block;margin:0 auto;"
        >
          <el-tab-pane
            label="介绍"
            name="first"
            style="margin-left:10px;font-weight:700"
          >
            <subjectDetail />
          </el-tab-pane>
          <el-tab-pane
            label="教程"
            name="second"
          >
            <courseContent />
          </el-tab-pane>
          <el-tab-pane
            label="其他相关"
            name="third"
            disabled
          >
            其他相关
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import courseContent from "./CourseContent";
import subjectDetail from "./Introduce";

export default {
  name: "HomePage",
  data() {
    return {
      title: "机械原理",
      activeName: "second",
      activeIndex: "1"
    };
  },
  methods: {},
  components: {
    courseContent,
    subjectDetail
  }
};
</script>

<style>
* {
  font-family: sans-serif, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB Microsoft YaHei, SimSun;
}
.titleOfSelect {
  background-color: #ffffff;
  line-height: 50px;
  margin: 0 auto;
  border-radius: 7px;
}
.grid-content {
  padding-bottom: 200px;
  border-color: hsl(0, 0%, 74%);
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 5px 7px 5px #d9d9d9;
}
#courseContent::-webkit-scrollbar {
  display: none;
}
.el-tabs__item:hover {
  font-weight: 700;
}
</style>
