<template>
  <div class="editorPage flexRJC">
    <div class="func">
      <el-tooltip
        class="tips"
        effect="dark"
        content="提交"
        placement="right"
      >
        <div
          class="submit el-icon-caret-right font20"
          @click="changeArticle"
        />
      </el-tooltip>
      <el-tooltip
        class="tips"
        effect="dark"
        content="取消"
        placement="right"
      >
        <div
          class="submit el-icon-refresh-left font20"
          @click="back"
        />
      </el-tooltip>
    </div>
    <div id="vditor" />
  </div>
</template>

<script>
import Vditor from "vditor";
import 'vditor/dist/index.css'
import articleObject from "../bricks/article";
import app from "../../newRequest/main"

export default {
  data() {
    return {
      editorConfig: {
        width:'80%',
        toolbar: [
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          {
            name: "more",
            toolbar: [
              "both",
              "export",
              "outline",
              "preview",
              "info",
              "help",
            ],
          },
        ],
        toolbarConfig: {
          pin: true,
        },
        preview: {
          hljs: {
            lineNumber: true,
            style: "abap",
          },
          markdown: {
            chinesePunct: true,
            footnotes: true,
            paragraphBeginningSpace: false,
          },
          math: {
            inlineDigit: true,
            engine: "KaTeX",
          },
        },
        mode: "ir",
        height: 'auto',
        counter: {
          enable: true,
        },
        after: () => {
          this.editor.setValue(this.article.articleData.content);
        },
        blur: () => {
          this.content = this.editor.getValue()
        },
      },
      editor: '',
      article: new articleObject(),
      content:''
    };
  },
  async mounted() {
    await this.getArticle();
    this.$nextTick(()=>{
      this.editor = new Vditor("vditor", this.editorConfig);
      
    })
    
  },
  async created() {
    
  },
  methods: {
    async getArticle() {
      await this.article.getArticleData(this.articleId);
    },
    async changeArticle(){
      let conf = confirm('确定提交吗？恶意修改将被封号')
      if(!conf)return
      await app.post('/editor/changeArticle',{
        _id:this.article.articleData._id,
        content:this.content
      })
      this.back()
    },
    back(){
      this.$router.go(-1)
    }
  },
  computed: {
    articleId() {
      return this.$route.params._id;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../assets/index.css";
.editorPage {

  margin-top:50px;
  width: 100%;
  height: auto;
  position: relative;
  .func{
    position:fixed;
    right: 20px;
    bottom:150px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .submit{
      margin-top:20px;
      width:40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background:#eee;
      border-radius: 20px;
      color:#444;
      &:hover{
        color:black;
      }
    }
  }
}
</style>