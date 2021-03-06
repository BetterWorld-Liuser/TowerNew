<template>
  <div>
    <div class="backgroundDisplay">
      <div class="titleContainer">
        <div class="bricktitle">
          <div class="title">
            {{ title }}
          </div>
          <div
            class="guanzhu"
            @click="watchingAdd"
          >
            <i class="el-icon-star-off" /><span>{{ watching }}</span>
          </div>
        </div>
        <div class="descriptionPlace">
          <div class="description">
            {{ description.des }}
          </div>
          <div
            class="editDes"
            @click="desVisble = true"
          >
            <i class="el-icon-edit" />
          </div>
        </div>
        <div class="buttonTop">
          <button
            style="display:none"
            class=" addModule cancel"
            @click="addModuleVisble = true"
          >
            创建模块
          </button>
          <button
            style="display:none"
            class=" addpara cancel"
            @click="addArticleVisble = true"
          >
            创建文章
          </button>
        </div>
        <!-- <div class="buttonRight">
          <button class=" addModule cancel" @click="watchingAdd">
            关注 <small>{{watching}}</small>
          </button>
          <button class=" addModule cancel" @click="desVisble=true">
            添加描述
          </button>
        </div> -->
      </div>
      <div class="contentContainer">
        <div class="leftMenu">
          <div class="addModuleBox">
            <input
              type="text"
              v-model="moduleAddform.name"
              placeholder="输入模块名"
            >
            <i
              class="el-icon-plus"
              @click="addModule"
            />
          </div>
          <draggable
            class="moduleMenu"
            v-model="modules"
            group="leftMenu"
            @start="drag = true"
            @end="drag = false"
            animation="150"
            :disabled="modulesDrag"
          >
            <div
              class="menuItems"
              v-for="(item, index) in modules"
              :class="index == select ? 'menuItemsSelect' : ''"
              :key="item._id"
              :id="item._id"
              @click="setItemData(item, index)"
              @contextmenu.prevent="onItemmenu"
            >
              {{ item.name }}
            </div>
          </draggable>
        </div>

        <div class="rightMenu">
          <button
            class="addArticle"
            @click="addArticleVisble=true"
          >
            添加文章
          </button>
          <draggable
            class="rightContent"
            v-model="articleData"
            group="brickItem"
            @start="drag = true"
            @end="drag = false"
            animation="150"
            :disabled="articleDrag"
          >
            <brickComponent
              v-for="item in articleData"
              :key="item._id"
              :article-data="item"
              @func="reciveSig"
            />
          </draggable>
        </div>
      </div>
    </div>
    <div class="dialogModule">
      <el-dialog
        title="添加模块"
        :visible.sync="addModuleVisble"
      >
        <el-form
          :model="moduleAddform"
          label-position="top"
        >
          <el-form-item
            label="模块名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="moduleAddform.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="addModuleVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="addModule"
          >
            确 定
          </button>
        </div>
      </el-dialog>
      <el-dialog
        title="添加文章"
        :visible.sync="addArticleVisble"
      >
        <el-form
          :model="articleAddForm"
          label-position="top"
        >
          <el-form-item
            label="文章名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="articleAddForm.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="addArticleVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="addPara"
          >
            确 定
          </button>
        </div>
      </el-dialog>
      <el-dialog
        title="修改模块名字"
        :visible.sync="changeModuleVisble"
      >
        <el-form
          :model="changeModuleNameForm"
          label-position="top"
        >
          <el-form-item
            label="模块名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="changeModuleNameForm.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="changeModuleVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="changeModuleName"
          >
            确 定
          </button>
        </div>
      </el-dialog>
      <el-dialog
        title="修改文章描述"
        :visible.sync="changeArticleVisble"
      >
        <el-form
          :model="changeArticleNameForm"
          label-position="top"
        >
          <el-form-item
            label="文章名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="changeArticleNameForm.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="changeArticleVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="changeParaName"
          >
            确 定
          </button>
        </div>
      </el-dialog>
      <el-dialog
        title="修改砖石描述"
        :visible.sync="desVisble"
      >
        <el-form
          :model="description"
          label-position="top"
        >
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              v-model="description.des"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <button
            class="mybutton cancel"
            @click="desVisble = false"
          >
            取 消
          </button>
          <button
            class="mybutton confirm"
            @click="descriptionAdd"
          >
            确 定
          </button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import brickComponent from "../component_common/BrickComponentsV1";
//import navbar from "../component_common/selfnavbar";
import request from "../../request/requestV2";
/* function() {
  //$('.titleContainer').css('background-img','url(\'https://s1.ax1x.com/2020/04/03/GaEmlQ.png\')')
  document
    .getElementsByClassName("titleContainer")[0]
    .classList.add("background");
}; */

export default {
  props: ["id"],
  data() {
    return {
      title: "",
      modules: [],
      //右侧列表的文章数据
      articleData: [],
      select: 0,
      addModuleVisble: false,
      addArticleVisble: false,
      changeModuleVisble: false,
      desVisble: false,
      changeArticleVisble: false,
      changeModuleNameId: "",
      changeParaNameId: "",

      formLabelWidth: "200px",
      moduleAddform: {
        name: "",
      },
      articleAddForm: {
        name: "",
      },
      changeModuleNameForm: {
        name: "",
      },
      changeArticleNameForm: {
        name: "",
      },
      articleDrag: true,
      modulesDrag: true,
      watching: 0,
      description: {
        des: "",
      },
    };
  },
  components: {
    brickComponent,
    draggable,
  },

  async mounted() {
    let { res } = await request.getBrick(this.id);
    this.title = res.title;
    this.modules = res.modules;
    this.articleData = this.modules[this.select].content;
    (this.watching = res.watching), (this.description.des = res.description);
  },
  methods: {
    async addModule() {
      this.addModuleVisble = false;
      let brickData = await request.createNewModule(
        this.moduleAddform.name,
        this.id
      );
      this.modules = brickData.modules;
      if (this.modules != undefined) {
        this.$notify({
          title: "成功",
          message: "成功创建一个新的模块",
          type: "success",
        });
      } else {
        this.$notify({
          title: "失败",
          message: "对不起发现未知错误",
          type: "warning",
        });
        this.moduleAddform.name = "";
        setTimeout(function() {
          location.reload();
        }, 3000);
      }
    },
    async addPara() {
      this.addArticleVisble = false;
      let { ok, res } = await request.createNewParagraph(
        this.articleAddForm.name,
        this.id,
        this.modules[this.select]._id
      );
      if (ok == 1) {
        this.title = res.title;
        this.modules = res.modules;
        this.articleData = this.modules[this.select].content;
      } else {
        console.log("获取砖石数据失败");
      }
    },
    async sortModule() {
      let res = await request.changeModuleSort(this.id, this.modules);
      if (res.ok == 1) {
        this.articleData = this.modules[this.select].content;
        this.$notify({
          title: "成功",
          message: "更新模块排序成功",
          type: "success",
        });
      } else {
        this.$notify({
          title: "失败",
          message: "更新模块排序失败",
          type: "warning",
        });
      }
    },
    async sortArticle() {
      let res = await request.changeParaSort(
        this.id,
        this.modules[this.select]._id,
        this.articleData
      );
      if (res.ok == 1) {
        this.$notify({
          title: "成功",
          message: "更新文章排序成功",
          type: "success",
        });
        this.modules[this.select].content = this.articleData;
      } else {
        this.$notify({
          title: "失败",
          message: "更新文章排序失败",
          type: "warning",
        });
      }
    },
    async changeModuleName() {
      this.changeModuleVisble = false;
      let res = await request.changeModuleName(
        this.id,
        this.changeModuleNameId,
        this.changeModuleNameForm.name
      );
      if (res.ok == 1) {
        this.$notify({
          title: "成功",
          message: "更新模块名称成功",
          type: "success",
        });
        this.modules.forEach((item) => {
          if (item._id == this.changeModuleNameId) {
            item.name = this.changeModuleNameForm.name;
          }
        });
      } else {
        this.$notify({
          title: "失败",
          message: "更新模块名称失败",
          type: "warning",
        });
      }
    },
    async changeParaName() {
      this.changeArticleVisble = false;
      let res = await request.changeParaName(
        this.id,
        this.changeParaNameId,
        this.modules[this.select]._id,
        this.changeArticleNameForm.name
      );
      if (res.ok == 1) {
        this.$notify({
          title: "成功",
          message: "更新模块名称成功",
          type: "success",
        });
        this.modules[this.select].content.forEach((item) => {
          if (item.article == this.changeParaNameId) {
            item.name = this.changeArticleNameForm.name;
          }
        });
      } else {
        this.$notify({
          title: "失败",
          message: "更新模块名称失败",
          type: "warning",
        });
      }
    },

    //点击模块后获取模块中的数据
    setItemData(modulesItem, index) {
      this.articleData = modulesItem.content;
      this.select = index;
    },
    onItemmenu(event) {
      //console.log(event.toElement.id)
      this.$contextmenu({
        items: [
          {
            label: "重命名",
            icon: "el-icon-edit",
            onClick: () => {
              this.changeModuleVisble = true;
              this.changeModuleNameId = event.toElement.id;
            },
          },
          { label: "删除结构", disabled: true, icon: "el-icon-delete" },
          {
            label: "开启排序",
            icon: "el-icon-check",
            onClick: () => {
              this.modulesDrag = false;
            },
          },
          {
            label: "关闭排序",
            icon: "el-icon-close",
            onClick: async () => {
              await this.sortModule();
              this.modulesDrag = true;
            },
          },
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 200,
      });
      return false;
    },
    reciveSig(signal) {
      if (signal == 2) {
        this.articleDrag = false;
      } else if (signal == 3) {
        this.sortArticle();
        this.articleDrag = true;
      } else if (signal == 4) {
        this.addArticleVisble = true;
      } else {
        this.changeParaNameId = signal;
        this.changeArticleVisble = true;
      }
    },
    async watchingAdd() {
      await request.watchingAdd(this.id);
      this.watching += 1;
    },
    async descriptionAdd() {
      this.desVisble = false;
      await request.descriptionAdd(this.id, this.description.des);
    },
  },
};
</script>

<style scoped>
.el-icon-plus {
  font-weight: bold;
  cursor: pointer;
}
.editDes {
  font-size: 1rem;
  color: #fa8c16;
  cursor: pointer;
}
.editDes:hover {
  font-weight: bold;
}

.descriptionPlace {
  display: flex;
  flex-direction: row;
}

.bricktitle {
  display: flex;
  height: 50%;
  position: relative;
}
.guanzhu {
  width: 1rem;
  height: 1rem;
  position: relative;
  top: 1.5rem;
  left: 1rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: #fd8b00;
}
.guanzhu span {
  position: relative;
  top: 0.3rem;
  font-size: 0.5rem;
}

.moduleMenu {
  width: 100%;
  max-height: 80%;
  overflow-y: scroll;
}
.moduleMenu::-webkit-scrollbar {
  display: none;
}

.description {
  color: black;
  font-size: 1rem;
}

.backgroundDisplay {
  background-color: transparent;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100vw auto;
}

.el-input {
  width: 100%;
}
.buttonTop {
  position: absolute;
  left: 1rem;
  display: flex;
  flex-direction: column;
}
.cancel {
  font-size: 0.7rem;
  margin: 10px 0 10px 0;
}

.newModule {
  border-radius: 2px;
  border: 2px solid black;
  padding: 5px;
  width: 5rem;
  height: 2rem;
}

.titleContainer {
  width: 90vw;
  height: 15vh;
  margin: 1rem 0 0 2.9rem;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100vw auto;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
}

.title {
  font-weight: bold;
  font-size: 2rem;
  color: black;
}
.contentContainer {
  display: flex;
  width: 100%;
  height: 70vh;
  flex-direction: row;
}
.leftContent {
  background-color: white;
  overflow-y: scroll;
}
.leftContent::-webkit-scrollbar {
  display: none;
}

.leftMenu {
  width: 15vw;
  /*   border-right: 1.5px solid #e9e9e9; */
  
  overflow: scroll;
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
  align-items: center;
  /*   border-radius: 5px 0 0 5px; */
  /*   border-right: #d9d9d9 solid 1px; */
  background-color: transparent;
}
.addModuleBox {
  width: 70%;
  margin-top: 0.3rem;
}
.addModuleBox input {
  border: 0px;
  width: 80%;
  border-bottom: 1px solid #d9d9d9;
  background-color: transparent;
  height: 1.5rem;
  outline: none;
  transition: border 0.5s;
  float: left;
}
.addModuleBox input::-webkit-input-placeholder {
  /* WebKit browsers 适配谷歌 */
  color: rgba(255, 255, 255, 0.658);
  font-weight: bold;
}
.addModuleBox input:focus {
  border-bottom: 1.5px solid #4646468a;
  background-color: transparent;
  height: 1.5rem;
  transition: border 0.5s;
}

.addModuleBox i {
  width: auto;
  height: 100%;
}

.menuItems {
  margin-top: 0.5rem;
  cursor: pointer;
  color: #404040;
  width: 70%;
  border-radius: 3px;
  height: 2rem;
  transition: color 0.5s;
  line-height: 2rem;
  margin: 0.5rem auto;
}
.menuItems:hover {
  font-weight: bold;
  color: black;
}
.menuItemsSelect {
  color: #F5A31F;
  font-weight: bold;
}

.leftMenu::-webkit-scrollbar {
  display: none;
}
.rightMenu{
  width: 85vw;
  height: auto;
  
}


.rightContent {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  
}
.addArticle{
  float: left;
  border:none;
  background: white;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.5s ;
  outline: none;
}
.addArticle:hover{
  background-color: #fa8c1631;
  
}

.buttonRight {
  position: absolute;
  right: 1rem;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1024px) {
  .contentContainer {
    flex-direction: column;
    height: auto;
  }
  .leftMenu {
    height: auto;
    width: 90vw;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    overflow-x: scroll;
    margin: 0 5vw 10px 5vw;
    border-radius: 5px;
  }
  .addModuleBox {
    
    width: 30%;
  }
  .addArticle{
    margin-left: 2.3rem;
  }
  .moduleMenu {
    display: flex;
    width: 70%;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  .moduleMenu::-webkit-scrollbar {
    display: none;
  }
  .menuItems {
    min-width: 2rem;
    margin: 0 0.5rem;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0;
    width: auto;
  }

  .rightMenu{
    width: 94vw;
    border-radius: 5px;
}
  .rightContent {
    height: 77vh;
    width: 94vw;
    border-radius: 5px;
  }
  .backgroundDisplay {
    background-color: transparent;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: auto 100vh;
    background-position: center;
  }
}
</style>
