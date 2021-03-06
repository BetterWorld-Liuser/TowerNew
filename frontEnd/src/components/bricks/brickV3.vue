<template>
  <div class="container">
    <div class="menu">
      <div class="flexRow">
        <div class="title">
          <div
            :contenteditable="contenteditable"
            @blur="editBlur"
          >
            {{ title }}
          </div>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="watchingState == true"  @click.native="watchRemove()">取消订阅{{ this.brickData.watchingUser.length }}</el-dropdown-item>
            <el-dropdown-item v-else @click.native="watchAdd()">订阅{{ this.brickData.watchingUser.length }}</el-dropdown-item>
            <el-dropdown-item @click.native="likeBrick()">点赞{{ this.brickData.like }}</el-dropdown-item>
            <el-dropdown-item @click.native="createComment()">评论</el-dropdown-item>
            <el-dropdown-item @click.native="pushToEditor()">编辑</el-dropdown-item>
            <el-dropdown-item
              v-if="disableDrag == true"
              @click.native="disableDrag = false"
            >
              开启拖拽
            </el-dropdown-item>
            <el-dropdown-item
              v-else
              @click.native="disableDrag = true"
            >
              关闭拖拽
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <draggable
        class="dragArea"
        v-model="menuContent"
        tag="div"
        :group="{ name: 'g1' }"
        animation="100"
        :disabled="disableDrag"
        @end="switchIndex"
      >
        <div
          v-for="el in menuContent"
          :key="el.id"
        >
          <!-- <a v-if="el.tasks.length!=0" class="menuicon el-icon-caret-right"  ></a> -->
          <div
            :class="['item', selected == el.id ? 'selected' : '']"
            @click="changeState(el.id, el._id)"
            @contextmenu.prevent="onContextmenu"
            @dblclick="addChild(el.id)"
          >
            <!-- <i class="el-icon-rank"></i> -->
            <!-- 如果没有子内容则隐藏下拉图标 -->
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
    <!-- <div class="info">
      <div class="handleArea">
        <a v-if="watchingState == true" @click="watchRemove()">取消订阅</a>
        <a v-else @click="watchAdd()">订阅</a>
        <a @click="likeBrick()">点赞</a>
        <a @click="createComment()">评论</a>
        <a @click="pushToEditor()">编辑</a>
        <div>版本{{ this.brickData.version }}</div>
        <div>协议{{ this.brickData.agreement }}</div>
        <div>点赞数{{ this.brickData.like }}</div>
        <div>订阅数{{ this.brickData.watchingUser.length }}</div>
      </div>
    </div> -->
    <div class="contentArea">
      <div class="content">
        <!-- <div class="toolbar"></div> -->
        <div class="showContent">
          <div
            class="contentRender"
            style="min-height:500px"
          />
          <div
            v-if="
              articleData.historyv3 != undefined &&
                articleData.historyv3.length > 0
            "
          >
            <div class="bold huge">
              <p>修改历史</p>
            </div>

            <div
              class="showHistory"
              v-for="el in articleData.historyv3"
              :key="el.version"
            >
              <div class="item">
                {{ el.email }}
              </div>
              <div class="item">
                修改了文章
              </div>
              <div class="item">
                {{ el.version }}
              </div>
              <div class="item">
                {{ el.editTime }}
              </div>
              <!-- <div class="item button">查看</div> -->
            </div>
          </div>
        </div>
        <div class="comments">
          <div
            class="item"
            v-for="el in comments"
            :key="el.time"
          >
            <div class="content">
              {{ el.content }}
            </div>
            <div>
              <div class="time">
                {{ el.time }}
              </div>
              <div
                class="del"
                @click="deleteComment(el._id)"
              >
                删除此评论
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="comment">
      <textarea name="addNewComment" id="addNewComment"></textarea>
      <el-button>发送</el-button>
      <div v-for="(p,index) in ping" :key="index" class="commentBox">

        <p>{{p.content}}</p>
        <p>{{"评论人:"+p.name}}</p>
        <small>{{p.time}}</small>
      </div>
    </div>-->

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
    >
      <el-form :model="form">
        <el-form-item
          :label="dialogWant"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
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
import reqBrick from "../../request/reqBrick";
import reqArticle from "../../request/reqArticle";
import reqComment from "../../request/reqComment";
import VditorMethod from "vditor/dist/method.min.js";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      //allowDrag:true,
      //allowDrop:true,
      nodeSelected: false,
      draging: false,
      disableDrag: true,
      selectNodeId: "",
      menuContent: [],
      show: 0,
      formLabelWidth: "120px",
      form: {
        name: "",
      },
      dialogTitle: "修改模块名称",
      dialogVisible: false,
      dialogWant: "名称",
      comments: [
        {
          email: "735083049@qq.com",
          content: "这里是评论区哟",
          time: "2020年5月24日",
        },
      ],
      title: "加载中",
      content: "内容还没出来，不要急",
      contenteditable: true,
      articleData: {
        content: "",
        updateTime: new Date().toLocaleString(),
        like: 10,
        version: "1.0.0",
        versionSay: "lalallal",
        agreement: "TIM",
        watching: [{ name: 1 }],
      },
      brickData: {
        watchingUser: [],
      },
      watchingState: false,
    };
  },
  computed: {
    selected() {
      return this.selectNodeId;
    },
    brickId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.$nextTick(() => {
      //let contentArea = document.getElementsByClassName('contentArea')[0]
      //vditorMethod.preview(contentArea,this.content)
    });
  },
  watch: {
    content: function() {
      let contentRender = document.getElementsByClassName("contentRender")[0];
      this.$nextTick(() => {
        //console.log(this.content)
        VditorMethod.preview(contentRender, this.content);
      });
    },
    $route() {
      this.getBrick();
    },
  },
  methods: {
    getEmail() {
      let email = localStorage.getItem("userEmail");
      if (email) {
        return email;
      } else {
        return "";
      }
    },
    checkLog() {
      if (this.$store.state.loginState) {
        return true;
      } else {
        alert("请先登录");
        return false;
      }
    },
    checkWatching() {
      let email = this.getEmail();
      for (let i = 0; i < this.brickData.watchingUser.length; i++) {
        if (email == this.brickData.watchingUser[i]) {
          return true;
        }
        return false;
      }
    },
    async getArticleData(id, moduleId) {
      let data = await reqArticle.getArticle(this.brickId, id, moduleId);
      if (id == "") {
        await this.getBrick();
      }
      this.selectNodeId = data.res.id;
      this.articleData = data.res;
      if (data.res.content == "") {
        this.content = "# 暂时还没有内容";
      } else {
        this.content = data.res.content;
      }
      let commentData = await reqComment.getComment(data.res.id);
      if (commentData.res != undefined) {
        this.comments = commentData.res.list;
      } else {
        this.comments = [];
      }
    },
    async createComment() {
      let comment = prompt("请输入评论");
      if (!comment) return;
      let email = this.getEmail();
      this.comments = await reqComment.createComment(
        this.selectNodeId,
        email,
        comment
      );
    },
    async deleteComment(commentId) {
      this.comments = await reqComment.deleteComment(
        this.selectNodeId,
        commentId
      );
    },
    async editBlur(e) {
      //console.log(e)
      if (this.checkLog()) {
        let name = "";
        if (!e.target.innerText) {
          name = "未命名";
        } else {
          name = e.target.innerText;
        }
        await reqBrick.changeBrickName(this.$route.params.id, name);
      }
    },
    pushToEditor() {
      this.$router.push({
        name: "markdownEditor",
        params: { id: this.selectNodeId },
      });
    },
    async changeState(id, moduleId) {
      this.selectNodeId = id;
      await this.getArticleData(id, moduleId);
    },
    rename(id) {
      if (!this.checkLog) {
        return;
      }

      let i = this.findNode(id);
      console.log(i);
      if (i == -1) {
        return;
      }
      let newName = prompt("请输入新的标题（恶意修改将导致封号）");
      console.log(newName);
      if (newName == null) return;

      this.menuContent[i].name = newName;
      reqBrick.changeModuleName(this.brickId, id, newName);
    },
    removeChild(id) {
      if (!this.checkLog) {
        return;
      }
      let i = this.findNode(id);
      if (i == -1) {
        return;
      } else {
        this.menuContent.splice(i, 1);
        reqBrick.deleModule(this.brickId, id);
      }
    },
    relevel(id) {
      let i = this.findNode(id);
      let r = prompt("请修改当前模块的层级", this.menuContent[i].level);
      if (r < 6 && r >= 0) {
        this.menuContent[i].level = r;
        reqBrick.changeModuleLevel(this.brickId, id, r);
      } else {
        alert("修改层数过大或过小");
      }
    },
    findNode(id) {
      let i = 0;
      for (; i < this.menuContent.length; i++) {
        if (this.menuContent[i].id == id) {
          return i;
        }
      }
      return -1;
    },
    async addChild(id) {
      let i = this.findNode(id);
      if (i == -1) {
        return;
      }
      let r = confirm("确认要添加新模块吗？（恶意添加将导致封号）");
      if (r == false) {
        return;
      }

      let res = await reqBrick.addNewModule(
        this.brickId,
        this.menuContent[i].level + 1,
        i + 1
      );
      this.menuContent.splice(i + 1, 0, {
        name: "新模块",
        id: res,
        level: this.menuContent[i].level + 1,
      });
    },
    switchIndex(evt) {
      reqBrick.sortModule(this.brickId, evt.oldIndex, evt.newIndex);
      console.log(evt.oldIndex);
      console.log(evt.newIndex);
    },
    async getBrick() {
      let { res } = await reqBrick.getBrick(this.brickId);
      this.title = res.title;

      if (res.modules.length == 0) {
        await reqBrick.addNewModule(this.brickId, 0, 0);
        await this.getBrick();
      } else if (!res.modules[0].name) {
        await reqBrick.changeModuleName(
          this.brickId,
          res.modules[0].id,
          "未命名"
        );
        this.getBrick();
      } else {
        this.menuContent = res.modules;
        this.selectNodeId = res.modules[0].id;
        this.getArticleData(this.selectNodeId, res.modules[0]._id);
        //this.content = res.content
        this.brickData = res;
        this.watchingState = this.checkWatching();
      }
    },
    async watchAdd() {
      reqBrick.watchingAdd(this.brickId);
      let email = this.getEmail();
      this.brickData.watchingUser.push(email);
      this.watchingState = true;
    },
    async watchRemove() {
      reqBrick.watchingRemove(this.brickId);
      let email = this.getEmail();
      this.brickData.watchingUser = this.brickData.watchingUser.filter((el) => {
        if (el == email) {
          return false;
        }
        return true;
      });
      this.watchingState = false;
    },

    async likeBrick() {
      await reqBrick.likeBrick(this.brickId);
      this.brickData.like++;
    },
    onContextmenu(event) {
      //let _model = this.model
      this.$contextmenu({
        items: [
          {
            label: "重命名",
            icon: "el-icon-name",
            onClick: () => {
              this.rename(event.target.id);
            },
          },
          {
            label: "删除此模块",
            icon: "el-icon-minus",
            onClick: () => {
              let r = confirm("删除子模块是危险操作（恶意删除将导致封号）");
              if (r == true) {
                this.removeChild(event.target.id);
              }
            },
          },
          {
            label: "开启拖拽",
            icon: "el-icon-open",
            onClick: () => {
              this.disableDrag = false;
            },
          },
          {
            label: "关闭拖拽",
            icon: "el-icon-close",
            onClick: () => {
              this.disableDrag = true;
            },
          },
          {
            label: "修改层级",
            icon: "el-icon-edit",
            onClick: () => {
              this.relevel(event.target.id);
            },
          },
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230,
      });
      return false;
    },
  },
  async created() {
    this.$store.commit("closeEditCard");
    await this.getBrick();
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/pie.css";

.container {
  width: 100%;
  position: fixed;
  top: 50px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", "sans-serif";
  height: 90%;
  overflow-x:scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  .menu {
    position: fixed;
    width: 20%;
    height: 100%;
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
  .contentArea {
    margin-left: 20%;
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: row;

    .content {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: row;
      .showContent {
        width: 75%;
        height: auto;
        min-height: 900px;
        padding: 0px 10px 10px 20px;
        border-right: 2px dotted #e9e9e9;
        .showHistory {
          display: flex;
          flex-direction: row;
          font-size: 14px;
          align-items: center;
          .item {
            transition: all ease-in-out 0.5s;
            cursor: default;
          }
          &:hover {
            .item {
              margin: 0 10px;
            }
          }
        }
      }
      .comments {
        width: 25%;
        height: 100%;
        padding: 10px;
        transition: all ease-in-out 0.5s;
        cursor: default;
        .content {
          margin-left: 5px;
          transition: all ease-in-out 0.5s;
          width: 90%;
          word-break: break-all;
          word-wrap: break-word;
        }
        .time {
          font-size: 12px;
          color: #e9e9e9;
          font-weight: bold;
          margin-top: 5px;
          transition: all ease-in-out 0.5s;
          display: inline-block;
        }
        .del {
          font-size: 12px;
          color: #e9e9e9;
          font-weight: bold;
          margin-left: 10px;
          transition: all ease-in-out 0.5s;
          display: inline-block;

          cursor: pointer;
          &:hover {
            color: black;
          }
        }
        &:hover {
          .email {
            margin-bottom: 8px;
          }
          .content {
            margin-left: 5px;
          }
          .time {
            font-size: 12px;
            color: #e9e9e9;
            font-weight: bold;
            margin-top: 8px;
          }
        }
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
