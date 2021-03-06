<template>
  <div class="container">
    <catalog
      class="catalog"
      :list="catalog.levels"
    />
    <!-- <div class="tools">
      <el-button class="backButton" icon="el-icon-back" circle></el-button>
      <el-button class="editButton" icon="el-icon-edit" circle></el-button>
    </div> -->
    <div class="backgroundImage">
      <div class="tools">
        <div
          class="back button"
          @click="backToBrick"
        >
          返回
        </div>
        <div
          class="edit button"
          @click="GoToEditMode"
        >
          编辑
        </div>
        <div
          class="comment button"
          @click="seeComment"
        >
          切换评论
        </div>
        <div
          class="openComment button"
          @click="addCommentVisble = true"
        >
          评论
        </div>
        <div
          class="liked button"
          @click="likeThisArticle"
        >
          喜欢 <small>{{ like }}</small>
        </div>
      </div>

      <div
        class="viewer"
        id="commentContainer"
      >
        <div
          id="articleThere"
          v-html="convertHtml"
          v-highlight
        />
        <commentelement
          v-for="item in commentData"
          :key="item._id"
          :comment-data="item"
          :article-id="articleId"
          :display-state="displayState"
        />
      </div>

      <div class="divider">
        - 全文完 -
      </div>
      <div class="updateTime">
        最后修改时间：{{ updateTime }}
      </div>
      <div class="edithistory">
        <!-- 编辑历史--代办
        <div class="editHistory" v-for="item in edithistory" :key="item.id">
          {{ item.name + " " }}于{{ " " + item.time + " " }}编辑了此页
        </div>
         -->
      </div>
      <div class="history">
        <div class="mainVesion">
          <div class="itemBox" />
        </div>
        <div class="normalHistory">
          <div class="itemBox" />
        </div>
      </div>
      <div class="people">
        <div class="peopleBox" />
      </div>

      <el-dialog
        title="添加评论"
        :visible.sync="addCommentVisble"
      >
        <el-form
          :model="addCommentform"
          label-position="top"
        >
          <el-form-item
            label="评论内容"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              v-model="addCommentform.content"
            />
          </el-form-item>
          <el-form-item
            label="选项"
            prop="type"
          >
            <el-radio-group v-model="addCommentform.type">
              <el-radio-button :label="'red'">
                错误
              </el-radio-button>
              <el-radio-button :label="'orange'">
                建议
              </el-radio-button>
              <el-radio-button :label="'blue'">
                提问
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="addCommentVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="openComment"
          >
            确 定
          </button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

//import "highlight.js/styles/atom-one-dark.css";
//import marked from "marked";
//import "mathjax/es5/tex-svg-full"
//import navbar from "../../component_common/selfnavbar";
import request from "../../../request/requestV2";
import commentelement from "../../component_common/coments";
import { catalog, getCatalog } from "vue-catalog";
/* import request from "../../../request/requestV2" */

export default {
  components: {
    commentelement,
    catalog,
  },
  data() {
    return {
      addCommentVisble: false,
      addCommentform: {
        content: "",
        type: "",
      },
      formLabelWidth: "200px",
      edithistory: [
        {
          name: "王宝宝",
          id: "12923912391",
          time: "2020-10-15 9:20",
        },
      ],
      content: "",
      people: [
        {
          name: "",
          id: "",
        },
      ],
      history: {
        lastTime: "",
        hour: "",
        day: "",
        week: "",
        month: "",
        year: "",
      },
      articleData: {},
      like: 0,
      updateTime: "",
      commentData: [],
      commentDataWhile:[],
      displayState: "true",
      articleId: "",
      catalog: {
        levels: [], // 有层级关系的目录结构数组
        noLevels: [], // 没有层级关系的目录结构数组
      },
    };
  },
  mounted() {
    /*     this.$nextTick().then(()=> {
        setTimeout(()=> {
        
        console.log(document.getElementById('articleThere'))
        console.log("mathjax开始加载")
        console.log(window.MathJax)
        
      },3000)
    }) */

    //let _this = this;
    //setTimeout(function() {}, 1000);

    //setTimeout(async () => {}, 500);

    //console.log(res2);

    window.onresize = this.autoresize;
  },

  created() {
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    content: function() {
      let _this = this;
      
      this.$nextTick(() => {//渲染后加载
        let article = document.getElementById("articleThere");
        let { levels, noLevels } = getCatalog(article);
        _this.catalog = {
          levels,
          noLevels,
        };
        if (_this.commonsVariable.isMathjaxConfig) {
          //判断是否初始配置，若无则配置。
          _this.commonsVariable.initMathjaxConfig();
        }
        _this.commonsVariable.MathQueue("articleThere"); //传入组件id，让组件被MathJax渲染
        _this.autoresize();

        setTimeout(() => {
          request.getComment(_this.$route.params.id).then((res) => {
          if (res.res != []) {
            _this.commentData = res.res;
          }
        });
        }, 3000);
        
      });
    },
  },
  computed: {
    convertHtml() {
      return marked(this.content);
    },
  },
  methods: {
    backToBrick() {
      this.$router.push("/brick/" + this.articleData.topicId);
    },
    async fetchData() {
      //获取本页markdown数据
      this.loadding = true;
      let res = await request.getPara(this.$route.params.id);
      this.content = res.res.content;
      this.articleData = res.res;
      this.like = res.res.like;
      this.updateTime = res.res.updateTime;
      this.articleId = res.res._id;
    },
    //跳转回主页
    backToMainPage() {},
    //进入编辑模式
    GoToEditMode() {
      this.$router.push({ path: "/markdownEditor/" + this.$route.params.id });
    },
    //查看评论
    seeComment() {
      if (this.displayState == "true") {
        this.displayState = "displayFalse";
      } else {
        this.displayState = "true";
      }
    },
    //mouseDown的行为
    async handleMouseDown(e) {
      e.preventDefault();
      let commentContainer = document.getElementById("commentContainer");

      let xpos =
        (e.pageX - commentContainer.offsetLeft + 1) /
        commentContainer.clientWidth;
      let ypos =
        (e.pageY - commentContainer.offsetTop - 59) /
        commentContainer.clientHeight;
      //console.log(e.pageY-commentContainer.offsetTop-60)
      let res = await request.createComment(
        this.$route.params.id,
        this.addCommentform.type,
        this.addCommentform.content,
        xpos,
        ypos
      );

      this.commentData.push(res);

      /* }else{
        let res = await request.createComment(
        this.$route.params.id,
        this.addCommentform.type,
        this.addCommentform.content,
        e.touches[0].pageX,
        e.touches[0].pageY)
        this.commentData.push(res);
      } */

      commentContainer.removeEventListener("mousedown", this.handleMouseDown);
      //document.body.removeEventListener("touchstart", this.handleMouseDown);
    },
    //开启评论
    async openComment() {
      let commentContainer =  document.getElementById("commentContainer")
      commentContainer.addEventListener("mousedown", this.handleMouseDown);
      //document.body.addEventListener("touchstart", this.handleMouseDown);
      this.addCommentVisble = false;
      this.displayState = "true";
    },
    //喜欢
    async likeThisArticle() {
      let res = await request.likePara(this.$route.params.id);
      if (res.ok == 1) {
        this.like++;
      } else {
        this.$notify({
          title: "失败",
          message: "未知原因点赞失败",
          type: "warning",
        });
      }
    },
    //调整autosize标签的宽高
    autoresize() {
      let count = document.getElementsByClassName("autosize").length;
      let items = document.getElementsByClassName("autosize");
      for (let i = 0; i < count; i++) {
        items[i].width = "80%";
        items[i].height = items[i].scrollWidth * 0.8 + "px";
        items[i].style.margin = "auto";
      }
    },
  },
};
</script>

<style scoped>
.backgroundImage {
  /* background-image: url("https://s1.ax1x.com/2020/04/15/JCfW1x.jpg"); */
  background-attachment: fixed;
  background-size: 100% auto;
  min-height: 100vh;
}

.el-divider {
  height: 1rem;
}
/* .backButton {
  position: absolute;
  top: 15px;
  left: 70px;
}
.editButton {
  position: absolute;
  top: 100px;
  left: 70px;
  margin-left: 0;
} */
.tools {
  display: flex;
  overflow: scroll;
  margin: 0 auto;
  width: 90vw;
  height: 8rem;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-flow: nowrap;
  border-radius: 5px;
}
.tools::-webkit-scrollbar {
  display: none;
}

.tools .button {
  font-size: 1rem;
  border: 2px solid #e6f7ff;
  border-radius: 4px;
  margin: 2rem 2rem 2rem 0;
  padding: 0 10px 0 10px;
  cursor: pointer;
  flex-shrink: 0;
  background-color: white;
}
.tools .liked {
  color: white;
  background-color: #40a9ff;
  font-weight: 700;
  border: 2px solid #40a9ff;
}

.catalog {
  position: fixed;
  background-color: white;
  font-size: 0.7rem;
  border-radius: 5px;
  right: 10px;
  top: 198px;
  width: 15%;
  height: 60vh;
  overflow: scroll;
  text-overflow: clip;
  transition: position 1s ease-in-out;
}
.catalog::-webkit-scrollbar {
  display: none;
}

#articleThere {
  width: 100%;
}

.viewer {
  display: flex;
  flex-direction: row;
  text-align: start;
  width: 80%;
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  margin-left: 1rem;
  margin-top: 10px;
  position: relative;
}
.viewer pre {
  border-radius: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  min-height: 100vh;
}
.MathJax {
  padding: 1px;
}
.updateTime {
  display: block;
  position: relative;
  right: 20px;
  min-width: 20px;
  min-height: 20px;
  font-size: 1em;
  color: rgb(97, 96, 96);
  margin-top: 0.5rem;
  line-height: 2;
  margin-bottom: 0.5rem;
}
.mobileUpdateTime {
  display: none;
}
.history {
  width: 100%;
  display: flex;
  flex-flow: wrap;
}

@media screen and (max-width: 1024px) {
  .backgroundImage {
    /* background-image: url("https://s1.ax1x.com/2020/04/15/JCfW1x.jpg"); */
    background-attachment: fixed;
    background-size: auto 100vh;
    background-position: center;
  }
  .viewer {
    width: 90%;
    margin: 0 auto;
    padding: 0.7rem;
  }

  /* .container {
    display: flex;
    position: relative;
  }
  .updateTime {
    display: none;
  }
  .el-button {
    display: none;
    width: 10px;
  }

  .edit {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 2px solid black;
    border-radius: 2px;
    padding: 3px;
  }
  .mobileUpdateTime {
    display: block;
    opacity: 1;
    position: absolute;
    right: 20px;
    min-width: 20px;
    min-height: 20px;
    font-size: 0.5em;
    color: rgb(97, 96, 96);
    margin-top: 3rem;
    line-height: 2;
  }
  mjx-container {
    padding: 1px;
  }
  .MathJax {
    padding: 1px;
  } */
}
</style>
