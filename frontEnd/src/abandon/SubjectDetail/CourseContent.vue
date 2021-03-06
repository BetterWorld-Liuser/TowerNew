<template>
  <div>
    <div style="width=100%;text-align:right;">
      <el-button
        type="primary"
        size="mini"
        style="font-weight:700;background-color:#e6f7ff;color:#1890ff;margin-bottom:10px"
        round
      >
        添加教程
      </el-button>
    </div>
    <div
      id="courseContent"
      style="width:100%;overflow:auto"
    >
      <el-collapse
        v-model="activeNameInCourses"
        accordion
      >
        <el-collapse-item
          :title="item.title"
          :name="item.title"
          v-for="item in coursesSelf"
          :key="item.title"
        >
          <div
            style="width:90%;text-align:left;margin-left:20px"
            class="myitem"
          >
            <div>
              <font style="font-weight:700">
                描述:
              </font>
              <div style="padding-bottom:20px">
                {{ item.description }}
              </div>
            </div>

            <div>
              <font style="font-weight:700;padding-right:20px">
                链接:
              </font><a :href="item.url">{{ item.url }}</a>
            </div>

            <div>
              <font style="font-weight:700;padding-right:20px">
                评分:
              </font>{{ item.score }}
            </div>
            <div
              style="float:right;"
              class="mybutton"
            >
              <el-button
                type="text"
                class="zan"
              >
                赞
              </el-button>
              <el-button type="text">
                评分
              </el-button>
              <el-button type="text">
                修改
              </el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNameInCourses: "",
      coursesSelf: [
        {
          title: "蚂蚁教学",
          description: "初等水平",
          url: "https://baidu.com",
          score: "4"
        },
        {
          title: "金锐教学",
          description: "中等水平",
          url: "https://baidu.com",
          score: "9"
        }
      ]
    };
  }
};
</script>

<style scoped>
:any-link:hover {
  font-weight: 600;
}
:any-link {
  color: red;
}

.mybutton {
  opacity: 0;
  padding-bottom: 10px;
  transition: all 0.3s ease-out;
}

.myitem:hover .mybutton {
  opacity: 1;
}
</style>
