<template>
  <div>
    <div class="header">
      <div class="header-title-1">
        结构
      </div>
      <img
        src="../../assets/red_of.png"
        alt="of"
        class="of"
      >
      <div class="header-title-2">
        {{ selectBrick.name }}
      </div>
      <Search />
    </div>
    <div class="main">
      <div class="handle">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addBrick">
              添加一块砖石
            </el-dropdown-item>
            <el-dropdown-item
              command="changeBrick"
            >
              修改一块砖石
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="behind">
        <div class="items">
          <Brick
            :item="br"
            v-for="br in BehindItems"
            :key="br.name"
          />
        </div>
      </div>
      <div class="label-1">
        ▲想要学更多嘛！┗|｀O′|┛ 嗷~~
      </div>
      <div class="middle">
        <div class="decorate-1" />
        <Brick :item="selectBrick" />
        <div class="decorate-2" />
      </div>
      <div class="label-2">
        ▼下面的都是很重要的知识哦！( •̀ ω •́ )✧
      </div>
      <div class="front">
        <div class="items">
          <Brick
            :item="br"
            v-for="br in FrontItems"
            :key="br.name"
          />
        </div>
      </div>
    </div>
    <div class="footer" />

    <el-dialog
      title="增加一块砖石"
      :visible.sync="addFormVisible"
    >
      <el-form
        :model="addform"
        :rules="rules"
        ref="addform"
      >
        <el-form-item
          prop="name"
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addform.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="砖石简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addform.introduce"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="position"
          label="位置"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addform.position"
            placeholder="请选择标签"
          >
            <el-option
              v-for="i in selectPosition"
              :key="i.name"
              :label="i.title"
              :value="i.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="label"
          label="标签"
          :label-width="formLabelWidth"
        >
          <el-select
            value-key="title"
            v-model="addform.label"
            placeholder="请选择标签"
          >
            <el-option
              v-for="i in labels"
              :key="i.title"
              :label="i.title"
              :value="i"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="add('addform')"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改一块砖石"
      :visible.sync="changeFormVisible"
    >
      <el-form
        :model="changeform"
        :rules="rulesofchange"
        ref="changeform"
      >
        <el-form-item
          prop="name"
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeform.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="rename"
          label="修改为"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeform.rename"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="砖石简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeform.introduce"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="position"
          label="修改到"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="changeform.position"
            placeholder="请选择标签"
          >
            <el-option
              v-for="i in selectPosition"
              :key="i.name"
              :label="i.title"
              :value="i.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="label"
          label="标签"
          :label-width="formLabelWidth"
        >
          <el-select
            value-key="title"
            v-model="changeform.label"
            placeholder="请选择标签"
          >
            <el-option
              v-for="i in labels"
              :key="i.title"
              :label="i.title"
              :value="i"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="changeFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="change('changeform')"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "../component_common/search";
import Brick from "../component_common/brick";
import Labels from "../component_common/label";
export default {
  data() {
    return {
      labels: Labels,
      selectPosition: [
        { name: "front", title: "前置" },
        { name: "behind", title: "后置" }
      ],
      formLabelWidth: "120px",
      changeFormVisible: false,
      addFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入砖石名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到6个字符", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "请输入砖石介绍", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" }
        ],
        label: [{ required: true, message: "请输入砖石标签", trigger: "blur" }],
        position: [
          { required: true, message: "请输入砖石插入位置", trigger: "blur" }
        ]
      },
      rulesofchange: {
        name: [
          { required: true, message: "请输入砖石名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到6个字符", trigger: "blur" }
        ],
        rename: [
          { min: 2, max: 6, message: "长度在2到6个字符", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "请输入砖石介绍", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" }
        ],
        label: [{ required: true, message: "请输入砖石标签", trigger: "blur" }],
        position: [
          { required: true, message: "请输入砖石插入位置", trigger: "blur" }
        ]
      },
      addform: {
        name: "",
        introduce: "",
        label: {},
        position: ""
      },
      changeform: {
        name: "",
        rename: "",
        introduce: "",
        label: {},
        position: ""
      }
    };
  },
  components: {
    Search,
    Brick
  },
  methods: {
    async add(add) {
      this.$refs[add].validate(async valid => {
        if (valid) {
          if (this.addform.position == "front") {
            let brick = await this.$request.getSelectBrick(this.selectBrick.name);
            this.$store.commit("refreshSelectBrick", brick.brick);
            this.$store.commit("mergebrick");

            let check_1 = this.checkItemExitInSelectBrick(this.addform.name);
            let check_2 = this.checkItemExitInBricks(this.addform.name);
            if (check_1 == 1) {
              console.log("砖石已存在，检查一下吧");
            } else {
              if (check_2 == 0) {
                this.addconstructionAndCreateNewBrick();
                this.addFormVisible = false
              } else {
                this.addconstruction();
                this.addFormVisible = false
              }
            }
          } else if (this.addform.position == "behind") {
            let check_1 = this.checkItemExitInSelectBrick(this.addform.name);
            let check_2 = this.checkItemExitInBricks(this.addform.name);
            if (check_1 == 1) {
              console.log("砖石已存在，检查一下吧");
            } else {
              if (check_2 == 0) {
                this.addconstructionAndCreateNewBrick();
                this.addFormVisible = false
              } else {
                this.addconstruction();
                this.addFormVisible = false
              }
            }
          } else {
            console.log("未知错误");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    async change(change) {
      this.$refs[change].validate(async valid => {
        if (valid) {
          let brick = await this.$request.getSelectBrick(this.selectBrick.name);
          this.$store.commit("refreshSelectBrick", brick.brick);
          this.$store.commit("mergebrick");
          console.log('按钮被按下')
          //名字是否在结构中
          let check_1 = this.checkItemExitInSelectBrick(this.changeform.name);
          //改的名字是否在结构中
          let check_2 = this.checkItemExitInSelectBrick(this.changeform.rename);
          //改的名字是否在砖石中
          let check_3 = this.checkItemExitInBricks(this.changeform.rename);
          //检查是否为空
          let check_4 = this.changeform.rename==''?1:0

           if (check_1 == 0) {
            console.log("要修改的砖石不存在，检查一下吧");
          }else if(check_4==1){
            
            this.changebrickconstructionAndChangeBrick()
            this.changeFormVisible = false
          } else if (check_2 == 1) {
            console.log("修改砖石的名字重复了，检查一下吧");
          } else if (check_3 == 1) {
            
            this.changebrickconstruction();
            this.changeFormVisible = false
            console.log(
              "修改砖石的名字已经存在砖石堆中，所以你的简介会无效化，但砖石依然被添加"
            );
          } else {
            this.changebrickconstructionAndChangeBrick();
            this.changeFormVisible = false
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    //检查项目是否在所选砖石的结构中
    checkItemExitInSelectBrick(item) {
      let exit = 0;
      for (let i of this.selectBrick.front) {
        if (i == item) {
          exit = 1;
          return exit;
        }
      }
      for (let i of this.selectBrick.behind) {
        if (i == item) {
          exit = 1;
          return exit;
        }
      }
      return exit;
    },

    //只是在现有砖石里添加结构不生成新砖石
    addconstruction() {
      this.$store.commit("addconstruction", this.addform);
      this.$store.commit("mergebrick");
      let change = this.selectBrick
      change.rename = change.name
      this.$request.changebrick(change)
    },

    //添加砖石的结构并在砖石堆里生成新的砖石
    addconstructionAndCreateNewBrick() {
      this.$store.commit("addconstruction", this.addform);
      this.$store.commit("mergebrick");
      this.$store.commit("addBrick", this.addform);
      let change = this.selectBrick
      change.rename = change.name
      this.$request.changebrick(change)
      let brick ={
        name: this.addform.name,
        introduce: this.addform.introduce,
        content: {
          courses: [
          ],
          realDone: [
          ],
          characters: [],
          forums: [],
          tools: [],
          books: []
        },
        label: {
          title: this.addform.label.title,
          introduce: this.addform.label.introduce,
          color: this.addform.label.color
        },
        front: [],
        behind: []
      }
      this.$request.addbrick(brick)

    },

    //检查项目是否在砖石堆中
    checkItemExitInBricks(item) {
      let exit = 0;
      for (let i of this.$store.state.bricks) {
        if (i.name == item) {
          exit = 1;
          return exit;
        }
      }
      return exit;
    },

    //修改结构的同时修改砖石
    changebrickconstructionAndChangeBrick() {
      if(this.changeform==''){
        this.changeform.rename = this.changeform.name
      }

      this.$store.commit("changeconstruction", this.changeform);
      this.$store.commit("changeBrick", this.changeform);
      let change = this.selectBrick
      change.rename = change.name
      this.$request.changebrick(change)

      let uploadBrick={}
      for(let i=0;i<this.Bricks.length;i++){
        //找到砖石并修改其名字
        if(this.Bricks[i].name == name){
          uploadBrick = this.Bricks[i]
          break
        }
      }
      uploadBrick.rename = name
      this.$request.changebrick(uploadBrick)
      
    },

    //仅仅修改砖石结构
    changebrickconstruction() {
      if(this.changeform==''){
        this.changeform.rename = this.changeform.name
      }
      this.$store.commit("changeconstruction", this.changeform);
      this.$store.commit("mergebrick");
      let change = this.selectBrick
      change.rename = change.name
      this.$request.changebrick(change)
    },

    //处理点击事件
    handleCommand(command) {
      if (command == "addBrick") {
        this.addFormVisible = true;
      } else if (command == "changeBrick") {
        this.changeFormVisible = true;
      }
    }
  },
  computed: {
    selectBrick() {
      return this.$store.state.selectBrick;
    },
    FrontItems() {
      let length = this.selectBrick.front.length;
      let count = 0;
      let frontitems = [];
      for (let item of this.$store.state.bricks) {
        for (let name of this.$store.state.selectBrick.front) {
          if (name == item.name) {
            count++;
            frontitems.push(item);
          }
          if (count == length) {
            count = 0;
            break;
          }
        }
      }
      return frontitems;
    },
    BehindItems() {
      let length = this.selectBrick.behind.length;
      let count = 0;
      let behinditems = [];
      for (let item of this.$store.state.bricks) {
        for (let name of this.$store.state.selectBrick.behind) {
          if (name == item.name) {
            count++;
            behinditems.push(item);
          }
          if (count == length) {
            count = 0;
            break;
          }
        }
      }
      return behinditems;
    },
    Bricks(){
       return this.$store.state.bricks;
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
}
.front {
  min-height: 500px;
  width: 100%;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.25);
  border-style: solid;
  border-radius: 7px;
  position: relative;
  margin-bottom: 70px;
}

.label-2 {
  width: 100%;
  height: 20px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
}

.middle > .itembox {
  position: absolute;
  left: 450px;
  margin-top: 0px;
  width: 500px;
}

.decorate-2 {
  right: 0px;
  position: absolute;
  width: 30%;
  background-image: linear-gradient(to left, #e2e1e1 0%, #bfbfbf 100%);
  height: 90px;
  border-radius: 7px;
}
.decorate-1 {
  position: absolute;
  width: 30%;
  background-image: linear-gradient(to right, #e2e1e1 0%, #bfbfbf 100%);
  height: 90px;
  border-radius: 7px;
}

.middle {
  width: 100%;
  position: relative;
  height: 100px;
  /*  background-color: rgba(0, 0, 0, 0.25); */
}

.label-1 {
  width: 100%;
  height: 20px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
}

.header-title-1 {
  font-size: 48px;
  font-weight: bold;
  position: absolute;
  left: 550px;
  top: 5px;
}
.header-title-2 {
  font-size: 36px;
  font-weight: bold;
  color: rgba(64, 169, 255, 100);
  position: absolute;
  left: 750px;
  top: 15px;
}
.header {
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.main {
  width: 100%;
}
.behind {
  min-height: 500px;
  width: 100%;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.25);
  border-style: solid;
  border-radius: 7px;
  position: relative;
}
.more {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
}
.items {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  margin-top: 40px;
}

.item {
  width: 250px;
}
.search {
  top: 25px;
  right: 20px;
}
.of {
  position: absolute;
  width: 80px;
  left: 650px;
}
.handle {
  position: relative;
  left: 610px;
  padding-bottom: 20px;
}
.el-icon-more {
  font-size: 30px;
}
</style>
