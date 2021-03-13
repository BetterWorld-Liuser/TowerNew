<template>
  <div class="container">
    <div class="menu">
      <div class="flexRow">
        <div class="title">
          <div>
            {{ menu.title }}
          </div>
        </div>
      </div>
      <draggable
        class="dragArea"
        v-model="menu.menuContent"
        tag="div"
        :group="{ name: 'g1' }"
        animation="100"
        :disabled="!drag.state"
        @end="switchIndex"
      >
        <div
          v-for="el in menu.menuContent"
          :key="el._id"
        >
          <div
            :class="[
              'item',
              menu.NodeSelected == el._id ? 'selected' : '',
            ]"
            @click="menuNodeClike(el)"
            @contextmenu.prevent="onContextmenu"
          >
            <div
              :class="['listTitle', el.level == 0 ? 'bold' : '']"
              :style="'position:relative;left:' + el.level * 14 + 'px'"
              :id="el.id"
            >
              <i class="no-vue-drag-node-icon" />
              <div class="Text">
                {{ el.name }}
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="menuTool flexRow">
      <el-tooltip
        class="tips"
        effect="dark"
        :content="drag.dragTips"
        placement="top"
      >
        <div
          :class="drag.state ? 'dragOpen' : 'drag'"
          @click="drag.switchState()"
        >
          <i class="el-icon-mouse" />
        </div>
      </el-tooltip>
      <el-tooltip
        class="tips"
        effect="dark"
        content="重命名标题"
        placement="top"
      >
        <div
          class="renameTitle"
          @click="renameTitle"
        >
          <i class="el-icon-edit-outline" />
        </div>
      </el-tooltip>
    </div>
    <div class="contentArea">
      <div class="content">
        <div class="showContent">
          <div
            class="contentRender"
            style="min-height: 500px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Vditor from "vditor";
//import VditorPreview from "vditor/dist/method.min";
//import { v4 as uuidv4 } from "uuid";
//import 'vditor/dist/method.min'
//import draggable from "vuedraggable";
//import vditorMethod from 'vditor/dist/method.min'

import draggable from "vuedraggable";
import VditorMethod from "vditor/dist/method.min.js";
import dragObject from "./drag.js";
import brickObject from "./brickObject";
import userObject from "./UserState.js";
import menuObject from "./menu.js";
import articleObject from "./article.js"
export default {
  components: {
    draggable,
  },
  data() {
    return {
      user: new userObject(),
      brick: new brickObject(),
      drag: new dragObject(),
      menu: new menuObject(),
      article: new articleObject()
    };
  },

  mounted() {
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    /* this.$nextTick(() => {
    }); */
  },
  watch: {
    content: function () {
      this.$nextTick(() => {
        //刷新视图内容
        let contentRender = document.getElementsByClassName("contentRender")[0];
        VditorMethod.preview(contentRender, this.article.articleData.content);
      });
    }
  },
  methods: {
    //初始化所有需要的数据和设置
    async init() {
      //初始化获取砖石数据
      await this.brick.getBrick(this.brickId);
      await this.user.getUserLocalData();
      await this.article.getArticleData(this.brick.brickData.modules[0].id)
      this.menu.getMenu(this.brick.brickData.modules);
      this.menu.getTitle(this.brick.brickData.title)
      this.menu.initData();
      this.$nextTick(()=>{
        let contentRender = document.getElementsByClassName("contentRender")[0];
        VditorMethod.preview(contentRender, this.article.articleData.content);
      })
    },
    async menuNodeClike(el){
      this.menu.changeNodeSelected(el._id);
      await this.article.getArticleData(el.id)
    },
    pushToEditor() {
      this.$router.push({
        name: "markdownEditor",
        params: { id: this.selectNodeId },
      });
    },
    switchIndex(menuIndex) {
      this.brick.switchIndex(menuIndex)
    },
    async refresh() {
      await this.brick.getBrick(this.brickId);
    },
    renameTitle(){
      
    }
  },
  computed: {
    brickId() {
      return this.$route.params.id;
    },
    Chtml(){
      return VditorMethod.md2html(this.article.content)
    },
    content(){
      return this.article.articleData.content
    }
  },
  async created() {
    await this.init()
  },

};
</script>

<style lang="less" scoped>
@import "../../assets/pie.css";

.container {
  width: 100%;
  padding: 20px 0px 0px 0px;
  height: 90%;
  &::-webkit-scrollbar {
    display: none;
  }
  .menu {
    position: fixed;
    width: 300px;
    height: 550px;
    background-color: #ffffff;
    border-right: 1px solid #f5f5f5;
    .title {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      .el-icon-plus {
        position: absolute;
        right: 10px;
        font-size: 17px;
        cursor: pointer;
        top: 24px;
      }
    }
    i {
      line-height: 50px;
      width: 50px;
      cursor: pointer;
    }
    .is-clicked {
      color: orange;
    }
    .vueDragTree {
      margin: 0 10px;
      cursor: pointer;
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
  }
  .menuTool {
    position: fixed;
    top: 650px;
    left: 20px;
    width: 300px;
    height: 50px;
    .drag {
      width: 60px;
      height: 30px;
      background-color: #eeeeee;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      margin-right: 20px;
      .el-icon-mouse {
        position: absolute;
        top: 8px;
        left: 8px;
        color: #bfbfbf;
      }
      &:hover {
        .el-icon-mouse {
          color: black;
        }
      }
    }
    .dragOpen {
      width: 60px;
      height: 30px;
      background-color: #eeeeee;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      margin-right: 20px;
      .el-icon-mouse {
        position: absolute;
        top: 8px;
        left: 8px;
        color: black;
      }
      &:hover {
        .el-icon-mouse {
          color: #bfbfbf;
        }
      }
    }
    .renameTitle {
      width: 60px;
      height: 30px;
      background-color: #eeeeee;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      .el-icon-edit-outline {
        position: absolute;
        top: 8px;
        left: 8px;
        color: #bfbfbf;
      }
      &:hover {
        .el-icon-edit-outline {
          color: black;
        }
      }
    }
  }
  .contentArea {
    margin-left: 20%;
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: row;
    .content {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: row;
      .showContent {
        width: 80%;
        height: auto;
        min-height: 900px;
        padding: 0px 10px 10px 20px;
        border-right: 2px dotted #e9e9e9;
      }
    }
  }
  .info {
    margin-left: 20%;
    width: 80%;
    height: 60px;
    display: flex;
    top: 60px;
    z-index: 1;
    align-items: center;
    position: fixed;
    background-color: white;
    .handleArea {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", "sans-serif";
      a {
        opacity: 0.4;
        transition: 0.5s;
        text-decoration: none;
        color: #5a5a5a;
        font-weight: bold;
        font-size: 15px;
        padding: 0 5px;
        cursor: pointer;
        &:hover {
          opacity: 1;
          margin: 0px 10px;
          font-size: 15px;
        }
      }
      div {
        opacity: 0.4;
        transition: 0.5s;
        text-decoration: none;
        color: #5a5a5a;
        font-weight: bold;
        font-size: 15px;
        cursor: default;
        padding: 0 10px;
        &:hover {
          opacity: 1;
          margin: 0px 40px;
          font-size: 15px;
        }
      }
    }
  }
}

.dragArea {
  //min-height: 6px;
  /* outline: 1px dashed; */
  //padding: 0px 0 5px 25px;
  position: relative;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  height: 92%;
  overflow-y: scroll;
  overflow-x: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  div {
    //margin: 0 0 5px 5px;
    position: relative;
    height: auto;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
    .item {
      text-align: start;
      height: auto;
      position: relative;
      margin: 0 10px 0 10px;
      border-radius: 5px;
      height: 30px;
      &:hover {
        background-color: #e9e9e9;
      }
      .listTitle {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        .Text {
          line-height: 30px;
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
        }
        .vue-drag-node-icon {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 10px;
          margin-right: 8px;
          border-left: 4px solid #222222;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 0 solid yellow;
          transition: transform 0.3s ease-in-out;
          position: relative;
          top: 11px;
        }
        .no-vue-drag-node-icon {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 10px;
          margin-right: 8px;
          border-left: 4px solid #222222;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 0 solid yellow;
          transition: transform 0.3s ease-in-out;
          position: relative;
          top: 11px;
          opacity: 0;
        }
        .point {
          top: 5px;
          left: -5px;
          font-size: 5px;
          cursor: pointer;
          &.gg-details-more {
            transform: scale(0.8);
            color: orange;
          }
        }
      }
      p {
        display: inline;
        margin: 0 0 10px 0;
        text-align: start;
      }
    }
    .selected {
      background-color: #ffe7ba !important ;
    }
  }
}

.huge {
  margin-top: 100px;
  font-size: 20px;
}
</style>
