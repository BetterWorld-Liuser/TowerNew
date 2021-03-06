import app from '../request/main';
import md5 from "md5";
class reqLogin {

    
    //登录获得Token
   async getToken(email, password) {

    let { data } = await app.post('users/login', {
        email: email,
        password: md5(password)
    })
    return data
}
}

export default new reqLogin()