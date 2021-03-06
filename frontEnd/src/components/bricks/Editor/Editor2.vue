<template>
  <div class="editorPage">
    <div id="vditor" />
  </div>
</template>

<script>
import Vditor from "vditor";
import reqArticle from "../../../request/reqArticle"

export default {
  data() {
    return {
      editorConfig: {},
      editor:"",
      content:"",
      version:""
    };
  },
  async mounted() {
    await this.getArticle()
    this.$nextTick(() => {
      this.editorConfig = {
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
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "export",
              "outline",
              "preview",
              "format",
              "info",
              "help"
            ]
          }
        ],
        toolbarConfig: {
          pin: true
        },
        preview: {
          hljs: {
            lineNumber: true,
            style: "abap"
          },
          markdown: {
            chinesePunct: true,
            footnotes: true,
            paragraphBeginningSpace: false
          },
          math: {
            inlineDigit: true,
            engine: "KaTeX"
          }
        },
        mode: "sv",
        height: 600,
        counter: {
          enable: true
        },
        after:()=>{
          //获取服务器的东西并渲染
          this.editor.setValue(this.content)
          //this.syncBrick(this.reqContent)
        },
        blur:(md)=>{
          let data = {articleId:this.articleId,md,version:this.version}
          this.$store.commit('syncArticle',data)
           }
      }
      this.editor = new Vditor("vditor", this.editorConfig);
    });
  },
  created() {
    
    
    this.$store.commit("openEditCard");
  },
  methods: {
    async getArticle() {
       let data = await reqArticle.getArticleTo(this.articleId)
       this.content = data.res.content
       this.version = data.res.version
    }
     
       
    
  },
  computed:{
    articleId(){
      return this.$route.params.id
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/index.css";
.editorPage {
  width: 100%;
  height: 700pxs;
}
</style>