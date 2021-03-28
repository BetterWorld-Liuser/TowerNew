export default class menu {
    NodeSelected=""
    NodeSort = 0;
    titleEditable=false
    title="加载中"
    menuContent=[]

    //初始化数据
    initData(){
        this.NodeSelected = this.menuContent[0]._id;
    }
    //获取列表
    getMenu(Content){
        this.menuContent = Content;
    }

    //获取标题
    getTitle(o){
        this.title=o
    }


    //切换列表可拖拽状态
    switchTitleEditable(){
        this.titleEditable=this.titleEditable?false:true;
    }

    //改变选择的节点
    changeNodeSelected(_id){
        this.NodeSelected = _id;
        this.NodeSort=this.findNode(_id)
    }

    //找到节点的序列
    findNode(_id) {   
        for (let i = 0; i < this.menuContent.length; i++) {
          if (this.menuContent[i]._id == _id) {
            return i;
          }
        }
        return -1;
    }
    //添加子节点-后续需要刷新节点列表
    addChild(){
        let r = confirm("确认要添加新模块吗？（恶意添加将导致封号）");
        return r;
    }

    //修改标题 - 需要提交
    renameName(newName){
          let i = this.findNode(this.NodeSelected)
          this.menuContent[i].name = newName;
    }

    //删除节点
    deleteModule(){
        this.menuContent.splice(this.NodeSort,1)
    }

    //修改层级
    relevel(level) {
          this.menuContent[this.NodeSort].level = level;
    }

    //交换层级顺序
    switchIndex(menuIndex){
        let A = this.menuContent[menuIndex.oldIndex]
        this.menuContent.splice(menuIndex.oldIndex,1)
        this.menuContent.splice(menuIndex.newIndex,0,A)
    }

    
}