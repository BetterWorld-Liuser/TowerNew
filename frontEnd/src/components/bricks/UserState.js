export default class userObject {

    userData = {
        loginState: false,
        email: "",
        token: ""
    }


    getUserLocalData() {
        if(localStorage.getItem('userData')==null){
            this.initUserData();
            return
        }else{
            this.userData = localStorage.getItem('userData')
        }
        

    }
    initUserData() {
        this.userData = {
            loginState: false,
            email: "",
            token:""
        }
    }
}