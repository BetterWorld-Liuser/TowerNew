export default class userObject {

    userData = {
        loginState: false,
        email: "",
        token: "",
        level:1,
    }

    //从本地存储中得到用户数据
    getUserLocalData() {
        if(localStorage.getItem('userData')==null){
            this.initUserData();
            return
        }else{
            this.userData = JSON.parse(localStorage.getItem('userData'))
        }
        

    }
    //重置用户数据
    initUserData() {
        this.userData = {
            loginState: false,
        email: "",
        token: "",
        level:1,
        }
    }

    //将现有数据存入本地
    localizeData(){
        localStorage.setItem('userData',JSON.stringify(this.userData))
    }

}