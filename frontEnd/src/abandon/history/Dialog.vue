<template>
  <el-dialog
    title="添加前置知识"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="formAddFront">
      <el-form-item
        label="类型"
        :label-width="formLabelWidth"
      >
        <el-autocomplete
          class="inline-input"
          v-model="formAddFront.type"
          :fetch-suggestions="querySearch"
          placeholder="请选择此知识点的类型"
          :debounce="0"
        />
      </el-form-item>
      <el-form-item
        label="知识名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="formAddFront.name"
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
</template>

<script>
export default {};
</script>

<style></style>
