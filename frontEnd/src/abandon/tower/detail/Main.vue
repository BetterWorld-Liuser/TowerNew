<template>
  <div>
    <div class="header">
      <div class="titleoftower">
        {{ selectTower.name }}
      </div>
      <div class="attention">
        <el-button
          type="danger"
          @click="openRule"
        >
          规则
        </el-button>
        <div class="more">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="addBrick"
              >
                添加一块砖石
              </el-dropdown-item>
              <el-dropdown-item
                command="changeBrick"
              >
                修改一块砖石
              </el-dropdown-item>
              <el-dropdown-item command="addFloor">
                添加一层
              </el-dropdown-item>
              <el-dropdown-item command="changeFloor">
                修改层介绍
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main">
      <div
        class="ceng"
        v-for="(ceng, index) in selectTower.brickList"
        :key="index"
      >
        <div class="decorate" />
        <div class="grade">
          第{{ index + 1 }}层
        </div>
        <div class="label">
          <i class="el-icon-warning-outline" />
        </div>
        <div class="reminder">
          {{ ceng.introduce }}
        </div>

        <el-divider />
        <div class="zhuanshibox">
          <Brick
            v-for="data in brickData[index].ceng"
            :key="data.name"
            :item="data"
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
          prop="index"
          label="层数"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addform.index"
            placeholder="请选择层数"
          >
            <el-option
              v-for="i in selectTower.brickList.length"
              :key="i"
              :label="i"
              :value="i"
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
          @click="addBrick('addform')"
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
        :model="changeForm"
        :rules="rules"
        ref="changeForm"
      >
        <el-form-item
          prop="name"
          label="原名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="rename"
          label="修改到"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeForm.rename"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="砖石简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeForm.introduce"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="index"
          label="层数"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="changeForm.index"
            placeholder="请选择层数"
          >
            <el-option
              v-for="i in selectTower.brickList.length"
              :key="i"
              :label="i"
              :value="i"
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
            v-model="changeForm.label"
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
          @click="changeBrick('changeForm')"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改层的介绍"
      :visible.sync="changeFloorVisible"
    >
      <el-form
        :model="changeFloor"
        :rules="floorRules"
        ref="changeFloor"
      >
        <el-form-item
          prop="introduce"
          label="层简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="changeFloor.introduce"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="index"
          label="层数"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="changeFloor.index"
            placeholder="请选择层数"
          >
            <el-option
              v-for="i in selectTower.brickList.length"
              :key="i"
              :label="i"
              :value="i"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="changeFloorVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="changeFloormethod('changeFloor')"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Brick from "../../component_common/brick";
import Labels from "../../component_common/label";
export default {
  data() {
    return {
      labels: Labels,
      addform: {
        name: "",
        introduce: "",
        label: {},
        index: 1
      },
      changeForm: {
        name: "",
        rename: "",
        introduce: "",
        label: {},
        reindex: 1
      },
      changeFloor:{
        introduce:'',
        index:1
      },
      addFormVisible: false,
      changeFormVisible: false,
      changeFloorVisible:false,
      formLabelWidth: "120px",
      floorRules:{
        introduce:[
          { required: true, message: "请输入介绍", trigger: "blur" },
          { min: 1, max: 40, message: "长度在2到40个字符", trigger: "blur" }
        ]
      },
      rules: {
        name: [
          { required: true, message: "请输入砖石名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在1到20个字符", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "请输入砖石介绍", trigger: "blur" },
          { min: 3, max: 30, message: "长度在3到30个字符", trigger: "blur" }
        ],
        label: [{ required: true, message: "请输入砖石标签", trigger: "blur" }],
        index: [
          {
            required: true,
            message: "请输入你想将砖石加入第几层",
            trigger: "blur"
          }
        ],
        rename: [
          { min: 1, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Brick
  },
  methods: {
    openRule() {
      this.$alert('<div>没想好</div>', "规则", {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
        callback: () => {
          this.$message({
            type: "info",
            message: "好好记住哦~"
          });
        }
      });
    },
    //处理三个选项
    handleCommand(command) {
      if (command == "addBrick") {
        this.addFormVisible = true;
        //this.addBrick(this.addform.index,this.addform)
      } else if (command == "changeBrick") {
        this.changeFormVisible = true;
      } else if(command =="changeFloor"){
        this.changeFloorVisible =true
      }else{
        this.addFloor();
      }
    },
    changeFloormethod(form){
        this.$refs[form].validate(async valid => {
        if (valid) {
          this.$request.getSelectTower(this.selectTower.name).then(res => {
            this.$store.commit("refreshSelectTower", res.tower);
            let tower = this.selectTower
            tower.brickList[this.changeFloor.index-1].introduce = this.changeFloor.introduce
            this.changeFloorVisible = false
            this.$store.commit('refreshTower',tower)
            this.$store.commit('mergetower',tower)
            tower.rename=tower.name
            this.$request.changetower(tower)
          })
        }else{
          console.log('submit error!')
        }
        })
    },
    //向塔中添加砖石
    addBrick(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$request.getSelectTower(this.selectTower.name).then(res => {
            
          this.$store.commit("refreshSelectTower", res.tower);
          
          //检查砖石是否已在塔中存在
          let check_1 = this.checkRepetitionOfBrickinTower(
            this.addform.name,
            this.selectTower
          );
          //检查砖石是否已在bricks中存在
          let check_2 = this.checkRepetitionOfBrickinBricks(
            this.addform.name,
            this.Bricks
          );
          this.addform.index = this.addform.index;
        //如果砖石不在塔中而且不在砖石堆中
          if (check_1 == 0 && check_2 == 0) {
            let poly = {
              name: this.selectTower.name,
              index: this.addform.index,
              brickname: this.addform.name
            };
            this.$store.commit("addBrick", this.addform);
            this.$request.addbrickByform(this.addform);
            this.$store.commit("addBrickToTower", poly);
            this.$store.commit("changeTowerState", this.selectTower.name);
            let tower = this.selectTower;
            tower.rename = tower.name;
            this.$request.changetower(tower);
            this.addFormVisible = false;
          } else if (check_1 == 0) {
            let poly = {
              name: this.selectTower.name,
              index: this.addform.index,
              brickname: this.addform.name
            };
            this.$store.commit("addBrickToTower", poly);
            this.$store.commit("changeTowerState", this.selectTower.name);
            let tower = this.selectTower;
            tower.rename = tower.name;
            this.$request.changetower(tower);
            this.addFormVisible = false;

            //告知用户Brick在砖石列表中已存在
            this.$notify({
              title: "警告",
              type: "warning",
              message:
                "你要加的砖石在砖石堆中已经存在，已经加入塔中，但你的介绍会无效化,如果想要修改介绍请点修改按钮"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "你要加的砖石在塔中已经存在了"
            });
          }
          });
          
        } else {
          console.log("submit error!");
        }
      });
    },

    getyourbrick(rename, name) {
      let brick = {};
      for (let item of this.Bricks) {
        if (item.name == rename) {
          brick = item;
        }
      }
      brick.name = name;
      brick.rename = rename;
      return brick;
    },
    getyourtower(rename, name) {
      let tower = this.selectTower;
      tower.name = name;
      tower.rename = rename;
      return tower
    },
    //更改塔中的砖石
    changeBrick(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          this.$request.getAll().then(res => {
            this.$store.commit("refreshBrick", res.bricks);
            this.$store.commit("refreshTower", res.towers);


            //检查是否在塔内
          let check_1 = this.checkRepetitionOfBrickinTower(
            this.changeForm.name,
            this.selectTower
          );
          //检查是否修改本砖石
          let check_2 = this.changeForm.rename == "" ? 1 : 0;
          //检查是否与其他塔内砖石重复
          let check_3 = this.checkRepetitionOfBrickinTower(
            this.changeForm.rename,
            this.selectTower
          );
          //检查是否与塔外砖石重复
          let check_4 = this.checkRepetitionOfBrickinBricks(
            this.changeForm.name,
            this.Bricks
          );
          if (check_1 == 0) {
            console.log("要修改的砖石不再塔内");
          } else if (check_2 == 1) {
            this.changeForm.rename=this.changeForm.name
            this.$store.commit("changeBrick", this.changeForm);
            this.$store.commit("changeTowerItemName", this.changeForm);
            this.changeFormVisible=false
            this.$request.changebrick(
            this.getyourbrick(this.changeForm.rename, this.changeForm.name)
            );
            this.$request.changetower(
              this.getyourtower(this.selectTower.name, this.selectTower.name)
            );
          } else if (check_3 == 1) {
            console.log("要修改的名字与塔内元素重复了");
          } else if (check_4 == 1) {
            this.changeFormVisible=false
            this.$store.commit("changeTowerItemName", this.changeForm);
            this.$request.changetower(
              this.getyourtower(this.selectTower.name, this.selectTower.name)
            );
          } else {
            this.changeFormVisible=false
            this.$store.commit("addBrick", this.changeForm);
            this.$store.commit("addBrickToTower", this.changeForm);
            this.$request.addbrick(
              this.getyourbrick(
                this.selectTower.rename,
                this.selectTower.rename
              )
            );
            this.$request.changetower(
              this.getyourtower(this.selectTower.name, this.selectTower.name)
            );
          }
          });
          
        } else {
          console.log("submit error!");
        }
      });
    },
    //向塔中添加一层
    addFloor() {
      this.$store.commit("addFloor", this.selectTower);
      console.log(this.getyourtower(this.selectTower.name,this.selectTower.name))
      this.$request.changetower(this.getyourtower(this.selectTower.name,this.selectTower.name))
    },
    //检测是否塔中已有重复砖石
    checkRepetitionOfBrickinTower(name, tower) {
      let exit = 0;
      //检测是否在列表中已存在
      for (let items of tower.brickList) {
        for (let item of items.items) {
          if (item == name) {
            exit = 1;
            console.log("砖石在列表中已经存在");
          }
        }
      }
      return exit;
    },
    checkRepetitionOfBrickinBricks(name, bricks) {
      let res = 0;
      for (let brick of bricks) {
        if (brick.name == name) {
          res = 1;
          break;
        }
      }
      return res;
    }
  },
  computed: {
    selectTower() {
      return this.$store.state.selectTower;
    },
    towers() {
      return this.$store.state.towers;
    },
    Bricks() {
      return this.$store.state.bricks;
    },
    brickData() {
      let data = [];
      let cengdata = { ceng: [] };

      for (let ceng of this.$store.state.selectTower.brickList) {
        let length = ceng.items.length;
        let count = 0;
        for (let brick of this.$store.state.bricks) {
          for (let item of ceng.items) {
            if (item == brick.name) {
              cengdata.ceng.push(brick);
              count++;
            }
          }
          if (count == length) break;
        }
        data.push(cengdata);
        cengdata = { ceng: [] };
      }

      return data;
    }
  }
};
</script>

<style scoped>
.header {
  margin-top: 20px;
  position: relative;
  height: 60px;
  width: 100%;
}
.titleoftower {
  font-size: 48px;
  font-weight: bold;
  color: rgba(64, 169, 255, 100);
}
.attention {
  position: absolute;
  right: 100px;
  top: 24px;
}
.el-button {
  font-weight: bold;
}
.main {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 30px;
}
.ceng {
  width: 100%;
  position: relative;
}
.decorate {
  position: absolute;
  height: 30px;
  background-color: #fa8c16;
  width: 5px;
  border-radius: 2px;
}
.grade {
  font-size: 20px;
  font-weight: bold;
  left: 15px;
  position: absolute;
}
.label {
  position: absolute;
  left: 90px;
  top: 7px;
}
.reminder {
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  position: absolute;
  top: 7px;
  left: 110px;
}
.zhuanshibox {
  padding-top: 50px;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;

  width: 120%;
  height: auto;
}
.itembox {
  margin-top: 5px;
}
.more {
  position: absolute;
  right: 90px;
  top: 9px;
  font-size: 20px;
}
.el-divider {
  position: absolute;
  top: 17px;
}
.el-icon-more {
  font-size: 20px;
}
</style>
