<template>
  <div>
    <el-tooltip
      placement="top"
      effect="light"
    >
      <div slot="content">
        {{ this.commentData.content }}
      </div>
      <div
        :class="'circle ' + commentData.type+' '+displayState"
        :id="commentData._id"
        @contextmenu.prevent="onItemmenu"
      />
    </el-tooltip>
  </div>
</template>

<script>
import marked from "marked";
import request from "../../request/requestV2";

export default {
  props: ["commentData", "articleId","displayState"],
  data() {
    return {
      commentType: ""
    };
  },
  computed: {
    htmlData() {
      return marked(this.commentData.content);
    }
  },
  methods: {
    onItemmenu(event) {
      //console.log(event.toElement.id)
      this.$contextmenu({
        items: [
          {
            label: "建议删除",
            icon: "el-icon-delete",
            onClick: () => {
              this.deleteComment();
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
    async deleteComment() {
      let res = await request.deleteComment(
        this.articleId,
        this.commentData._id
      );
      if (res.ok != 0) {
        this.$notify({
          title: "成功",
          message: "成功建议删除，请不要重复",
          type: "success"
        });
      } else {
        this.$notify({
          title: "失败",
          message: "出现未知错误",
          type: "warning"
        });
      }
    }
  },
  mounted(){
      let comment=document.getElementById(this.commentData._id)
        //console.log("comment"+comment.toString())
        let container = document.getElementById('commentContainer')
        comment.style.position="absolute"
        if(comment!=null){
            comment.style.left = Math.floor(this.commentData.positionX*container.clientWidth)+'px'
            comment.style.top = Math.floor(this.commentData.positionY*container.clientHeight) +'px'
            console.log(container.clientHeight)
        }
  }
};
</script>

<style scoped>

@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

@keyframes fadeOut {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    display: none;
  }
}

.displayFalse{
    display: none;
    opacity: 0;
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  position: absolute;
  transition: all 0.75s;
  background-color:#ffadd2;
  box-shadow:1px 1px 3px 0px #fff0f6;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 1s ease-in 0.5s 1 normal forwards;
}

.circle:hover {
  transform:scale(1.5,1.5);
    border-radius: 10px;
    
}
.red {
  background-color: #f5222d;
  box-shadow:1px 1px 3px 0px #f5222da2;
}
.orange {
  background-color: #fa8c16;
  box-shadow:1px 1px 3px 0px #fa8c16a1;
}
.blue {
  background-color: #1890ff;
    background-color: #188fffa1;

}
</style>
