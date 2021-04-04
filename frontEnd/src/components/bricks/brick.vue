<template>
  <div class="container flexRow">
    <div class="menuArea">
      <div class="menu">
        <div class="titleContainer flexRow">
          <div class="title">
            <div>
              {{ menu.title }}
            </div>
          </div>
          <el-tooltip
            class="tips"
            effect="dark"
            content="重命名标题"
            placement="top"
            v-if="brick.brickData.lock == false || user.userData.level > 5"
          >
            <div
              class="renameTitle func"
              @click="changeBrickTitle()"
            >
              <i class="el-icon-edit-outline icon" />
            </div>
          </el-tooltip>
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
              :class="['item', menu.NodeSelected == el._id ? 'selected' : '']"
              @click="pushTo(el)"
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
      <div class="menuTool flexRow  ">
        <el-tooltip
          class="tips"
          effect="dark"
          :content="drag.dragTips"
          placement="top"
          v-if="brick.brickData.lock == false || user.userData.level > 5"
        >
          <div
            :class="drag.state ? 'dragOpen func' : 'func'"
            @click="drag.switchState()"
          >
            <i class="el-icon-mouse icon" />
          </div>
        </el-tooltip>
        <el-tooltip
          class="tips"
          effect="dark"
          content="重命名当前模块"
          placement="top"
          v-if="brick.brickData.lock == false || user.userData.level > 5"
        >
          <div
            class="renameModule func"
            @click="changeModuleName()"
          >
            <i class="el-icon-edit icon" />
          </div>
        </el-tooltip>
        <el-tooltip
          class="tips"
          effect="dark"
          content="修改模块层级"
          placement="top"
          v-if="brick.brickData.lock == false || user.userData.level > 5"
        >
          <div
            class="func"
            @click="changeModuleLevel()"
          >
            <i class="el-icon-s-help icon" />
          </div>
        </el-tooltip>
        <el-tooltip
          class="tips"
          effect="dark"
          content="添加新模块"
          placement="top"
          v-if="brick.brickData.lock == false || user.userData.level > 5"
        >
          <div
            class="func"
            @click="createModule()"
          >
            <i class="el-icon-plus icon" />
          </div>
        </el-tooltip>
        <el-tooltip
          class="tips"
          effect="dark"
          content="删除模块"
          placement="top"
          v-if="user.userData.level > 5"
        >
          <div
            class="func"
            @click="deleteModule()"
          >
            <i class="el-icon-delete icon" />
          </div>
        </el-tooltip>
      </div>
      <div
        :class="(brick.brickData.lock&&user.userData.level<5)?'editBrick bold lock':'editBrick bold '"
        @click="gotoEditor()"
      >
        编辑此砖石
      </div>
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
//TODO 锁定某个砖石
import draggable from "vuedraggable";
import VditorMethod from "vditor/dist/method.min.js";
import dragObject from "./drag.js";
import brickObject from "./brickObject";
import userObject from "./UserState.js";
import menuObject from "./menu.js";
import articleObject from "./article.js";
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
      article: new articleObject(),
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
    },
  },
  methods: {
    //初始化所有需要的数据和设置
    async init() {
      //初始化获取砖石数据
      this.user.getUserLocalData();
      await this.brick.getBrick(this.brickId);
      await this.article.getArticleData(this.brick.brickData.modules[0].id);
      this.menu.getMenu(this.brick.brickData.modules);
      this.menu.getTitle(this.brick.brickData.title);
      this.menu.initData();
      this.goToModule(this.routerModuleId)
      this.$nextTick(() => {
        let contentRender = document.getElementsByClassName("contentRender")[0];
        VditorMethod.preview(contentRender, this.article.articleData.content, {
          anchor: 1,
        });
      });
    },
    async goToModule(_id) {
      if(_id==null)return;
      this.menu.changeNodeSelected(_id);
      await this.article.getArticleData(this.menu.menuContent[this.menu.NodeSort].id);
    },
    switchIndex(menuIndex) {
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      this.brick.switchIndex(menuIndex);
    },
    async changeBrickTitle() {
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      let newTitle = prompt("请输入砖石标题（恶意修改将导致封号）");
      if (newTitle == null) return;
      this.menu.title = newTitle;
      this.brick.changeBrickTitle(newTitle);
    },
    async changeModuleName() {
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      let newName = prompt("请输入新的标题（恶意修改将导致封号）");
      if (newName == null) return;
      this.menu.renameName(newName);
      await this.brick.changeModuleName(
        this.menu.menuContent[this.menu.NodeSort].id,
        newName
      );
    },
    async changeModuleLevel() {
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      let level = prompt(
        "请修改当前模块的层级",
        this.menu.menuContent[this.menu.NodeSort].level
      );
      if(!level)return
      if (level < 6 && level >= 0) {
        this.menu.relevel(level);
        await this.brick.changeModuleLevel(
          this.menu.menuContent[this.menu.NodeSort].id,
          level
        );
      } else {
        alert("修改层数过大或过小");
      }
    },
    async createModule() {
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      let conf = confirm('确定要创建吗？')
      if(!conf)return
      await this.brick.createModule(
        0,
        this.menu.NodeSort+1,
        this.user.userData.email
      );
      await this.init();
    },
    async deleteModule() {
      let conf = confirm("确定要删除此模块吗？");
      if (conf != true) return;
      await this.brick.deleModule(this.menu.menuContent[this.menu.NodeSort].id);
      await this.init();
    },
    gotoEditor(){
      if(!this.user.userData.loginState){
        alert('请先登录！')
        return
      }
      if(this.brick.brickData.lock&&this.user.userData.level<5){
        alert('对不起，此砖石上锁')
        return
      }
      this.$router.push({
        name: "markdownEditor",
        params: { _id: this.article.articleData._id },
      });
    },
    pushTo(el){
      this.$router.push({
        name:"brick",
        params:{
          _id:this.brickId,
          moduleId:el._id
        }
      })
      this.goToModule(el._id)
      }
    
  },
  computed: {
    brickId() {
      return this.$route.params._id;
    },
    routerModuleId(){
      return this.$route.params.moduleId;
    },
    content() {
      return this.article.articleData.content;
    },
  },
  async created() {
    await this.init();
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/pie.css";

.container {
  width: 100%;
  padding: 20px 0px 0px 0px;
  height: 90%;
  .menuArea {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    width: 300px;
    height: 100%;
    position: fixed;
    z-index: 2;
    bottom: 0px;
    .menu {
      margin-top: 74px;
      width: 300px;
      height: 500px;
      background: #ffffff;
      border-right: 1px solid #f5f5f5;
      z-index: 2;
      .titleContainer {
        height: 300px;
        height: 50px;
        align-items: center;
        .title {
          width: 250px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px;
        }
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
      margin-top:10px;
      width: 300px;
      height: 80px;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #ffffff;
      z-index: 2;
      .dragOpen {
        .el-icon-mouse {
          color: black;
        }
        &:hover {
          .el-icon-mouse {
            color: #bfbfbf;
          }
        }
      }
    }
    .editBrick{
      width:280px;
      margin:0px 10px;
      height:40px;
      line-height: 40px;
      text-align: center;
      background-color: #1890ff;
      border-radius: 10px;
      color: white;
      letter-spacing: 2px;
      cursor: pointer;
    }
    .lock{
      background-color:#8c8c8c ;
    }
  }

  .contentArea {
    width: 80%;
    height: auto;
    display: flex;
    margin-left: 20%;
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
}

.dragArea {
  //min-height: 6px;
  /* outline: 1px dashed; */
  //padding: 0px 0 5px 25px;
  position: relative;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  height: 455px;
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

.func {
  width: 60px;
  height: 30px;
  background-color: #eeeeee;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  margin: 4px 10px;
  .icon {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: #bfbfbf;
  }
  &:hover {
    .icon {
      color: black;
    }
  }
}
</style>
