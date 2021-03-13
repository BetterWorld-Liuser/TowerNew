import reqArticle from "../../request/reqArticle"
export default class articleObject {
    articleData={
        _id:"",
        title:"",
        content: "",
        updateTime: new Date().toLocaleString(),
        like: 0,
        version: "1.0.0",
        versionSay: "lalallal",
        agreement: "TIM",
        lock:false,
        creator:""
      }

    //获取文章数据
    async getArticleData(id){
       let data =  await reqArticle.getArticle(id)
       this.articleData = data.res;
    }
}