
const userHandler = require("../handler/userhandle");
const config = require("../../src/routes/config")
const jwt = require("koa-jwt")({ secret: config.secret, passthrough: true }); //解码中间件
const Router = require("@koa/router");
const router = new Router();

router.use(jwt, async (ctx, next) => {
    let res = await userHandler.checkPassWord(ctx.state.user.email, ctx.state.user.password)
    if (res) {
        await next()
    } else {
        ctx.body = {
            message: "你还没登录"
        }
    }
})













module.exports = router.routes();