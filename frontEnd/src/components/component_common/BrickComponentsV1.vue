<template>
  <div>
    <div
      class="container"
      @contextmenu.prevent="onContextmenu"
      @click="toDetial"
    >
      <div class="name">
        {{ articleData.name }}
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props:["articleData"],
  data(){
    return{}
  },
  methods: {
    onContextmenu(event) {
      this.$contextmenu({
        items: [
          {
            label: "创建文章",
            icon: "el-icon-plus",
            onClick: () => {
              this.$emit('func',4)
            }
          },
          {
            label: "重命名",
            icon: "el-icon-edit",
            onClick: () => {
              this.$emit('func',this.articleData.article)
            }
          },
          { label: "删除模块",
            disabled:true, 
            icon: "el-icon-delete",
            onClick: () => {
              this.$emit('func',1)
            }
            },
          { label: "开启排序",
          icon: "el-icon-check",
          onClick: () => {
              this.$emit('func',2)
            }
          },
          { label: "关闭排序",
          icon: "el-icon-close",
          onClick: () => {
              this.$emit('func',3)
            }
          }
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 200
      });
      return false;
    },
    toDetial(){
      this.$router.push({path:"/article/"+this.articleData.article})
    }
  }

}
</script>

<style scoped>
.container{
  width:70vw;
  border-radius: 3px;
  background-color: white;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-top:1rem;
  transition: transform 0.5s;
  box-shadow: 1px 1px 2px 0px rgba(250, 165, 133, 0.541);
}

.container:hover{
  transform:translateX(-10px);
}
.name{
  margin-left:3rem;
  font-weight: bold;
  font-size: 1.1rem;
}

@media screen and (max-width:1024px) {
  .container{
    margin:0.5rem auto;
  }
  
}

</style>