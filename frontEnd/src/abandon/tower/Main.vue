<template>
  <div>
    <div class="header">
      <div class="tower">
        塔
      </div>
      <div class="more">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addTower">
              添加一个塔
            </el-dropdown-item>
            <!--             <el-dropdown-item command="changeBrick"
              >修改一块砖石</el-dropdown-item
            > -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <Search :state="'towers'" />
      <el-button class="feedback">
        问题反馈
      </el-button>
      <el-button
        class="rule"
        @click="openRule"
      >
        规则
      </el-button>
    </div>
    <el-divider />
    <div class="towerbox">
      <TowerItem
        v-for="tower in towers"
        :key="tower.name"
        :tower-item="tower"
        @click.native="routerToTowerDetails(tower.name)"
      />
    </div>
    <el-dialog
      title="增加一块塔"
      :visible.sync="addFormVisible"
    >
      <el-form
        :model="addform"
        :rules="rules"
        ref="addform"
      >
        <el-form-item
          prop="name"
          label="塔的名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addform.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="塔的简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addform.introduce"
            autocomplete="off"
          />
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
          @click="addTower('addform')"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "../component_common/search";
import TowerItem from "../component_common/toweritem";
import TowerModel from "../component_common/towerModel";
let htmlRules =
  "<ul><li>默认不能修改塔的内容和简介，只有<strong>管理员</strong>可以修改,<strong>没错只有我一个人</strong>，因为塔的内容和简介关联塔内层级，不方便修改。请谨慎添加。</li><li>当然，可以联系QQ1610156666更改。</li><li>后期开放注册账号了以后就会启用。</li></ul>";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      addFormVisible: false,
      addform: {
        name: "",
        introduce: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入塔的名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2到6个字符", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "请输入塔介绍", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Search,
    TowerItem
  },
  methods: {
    openRule() {
      this.$alert(htmlRules, "规则", {
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
    async addTower(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {

          let tower = await this.$request.getSelectTower(this.selectTower.name);
          this.$store.commit("refreshSelectBrick", tower.tower);
          this.$store.commit("mergetower");
          //检查塔是否已存在
          let check_1 = this.checkTowerExit(formName.name);

          if (check_1 == 0) {
            let data = TowerModel;
            data.name = this.addform.name;
            data.introduce = this.addform.introduce;
            let myDate = new Date();
            data.updateTime = myDate.toLocaleString();
            this.$store.commit("addTower", data);
            //向服务器发起请求添加塔的内容
            this.$request.addTower(data)

            this.addFormVisible=false
          }else{
            this.$notify.error({
              title:"错误",
              message:"你要添加的塔已经存在了，请检查一下"
            })
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCommand(command) {
      if (command == "addTower") {
        this.addFormVisible = true;
      }
    },
    //跳转到detail页面
    routerToTowerDetails(name) {
      for (let item of this.towers) {
        if (item.name == name) {
          this.$store.commit("changeTowerState", name);
          this.$router.push({ path: "towerDetail" });
          this.$store.commit("TowerSeeadd");
          this.$store.commit("mergetower");
          console.log('塔的关注数')
          this.$request.seeadd(this.selectTower.name)
          break
        }
      }
    },
    checkTowerExit(name) {
      let exit = 0;
      for (let tower of this.towers) {
        if (tower.name == name) {
          exit = 1;
        }
      }
      return exit;
    }
  },
  computed: {
    selectTower() {
      return this.$store.state.selectTower;
    },
    towers() {
      return this.$store.state.towers;
    }
  }
};
</script>

<style scoped>
.towerbox {
  width: 100%;
  display: flex;
  flex-flow: wrap;
}

.header {
  margin-top: 20px;
  position: relative;
  height: 60px;
  width: 100%;
}
.tower {
  font-size: 48px;
  font-weight: bold;
  color: rgba(64, 169, 255, 100);
  position: absolute;
  top: 0px;
  left: 20px;
}
.more {
  position: absolute;
  left: 200px;
  top: 40px;
  font-size: 20px;
}
.feedback {
  background-color: rgba(64, 169, 255, 100);
  color: white;
  position: absolute;
  top: 20px;
  right: 5%;
  border-radius: 10px;
  width: 120px;
}

.rule {
  position: absolute;
  top: 40px;
  left: 90px;
  padding: 0;
  border-width: 0px;
  padding: 2px;
  font-weight: bold;
  color: red;
}</style
>>
