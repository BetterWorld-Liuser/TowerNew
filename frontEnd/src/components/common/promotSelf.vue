<template>
  <div>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.content"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PromotSelf",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
          content:""
        }
    };
  }
};
</script>

<style>
</style>