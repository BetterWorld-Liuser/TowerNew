export default class dragObject {
    state=false;
    dragTips="点击打开拖拽状态"
    switchState(){
        if(this.state==true){
            this.state=false;
            this.dragTips="点击打开拖拽状态"
          }else{
            this.state=true
            this.dragTips="点击关闭拖拽状态"
          }
    }
    
}