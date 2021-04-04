const Router = require("@koa/router");
const router = new Router();
const userModel = require("../DB/SchemaAndModel/user")
const config = require("../../config")
const {
    sign
} = require("jsonwebtoken"); //签发token
const information = require("../DB/SchemaAndModel/information");



//登录处理
router.post("/login", async ctx => {
    let {
        email,
        password
    } = ctx.request.body;
    if (email && password) { //判断请求的信息是否正确
        //检查邮箱是否存在
        let res = await userModel.findOne({
            email
        });
        if (res==undefined) {
            let userData = await userModel.create({
                email,
                password,
                registerTime: new Date().toLocaleString()
            })
            let token = sign({
                email,
                password
            }, config.tokenSecret);
            ctx.body = {
                message: "成功注册",
                token,
                userData
            }
            await information.updateOne({}, {
                $inc: {
                    userNew: 1,
                    userNumber: 1
                }
            })
            return
        } else {
            let userData = await userModel.findOne({
                email,
                password
            });
            if (res==undefined) {
                ctx.body = {
                    message: "帐号或密码错误"
                }
            } else {
                let token = sign({
                    email,
                    password
                }, config.tokenSecret);
                ctx.body = {
                    message: "成功登录",
                    token,
                    userData
                };
            }
        }
    }


});

module.exports = router.routes();