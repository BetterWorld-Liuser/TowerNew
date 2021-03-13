const Koa = require("koa");
const Router = require("@koa/router");
const koaBodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const mongoose = require("mongoose");
const userHandler = require('./DB/userhandle')
const enforceHttps = require('koa-sslify').default;
const https = require('https');
const needLog = require('./Routes/needLog')
const users = require('./Routes/user')
const info = require('./Routes/info')
const brick = require('./Routes/brick')
const comment = require('./Routes/comment')
const article = require('./Routes/article')
const fs = require('fs');
const path = require('path')
const schedule = require('node-schedule');
const app = new Koa();
const router = new Router();
const config = require('../config.js');


mongoose.connect(config.developMode ? config.localMongoUrl : config.remoteMongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(e=>{
  console.log(e)
});



if (config.developMode) {
  //app.use(enforceHttps());
  app.use(koaBodyParser()); //得到post
  app.use(cors()); //跨域
} else {
  app.use(enforceHttps());
  app.use(koaBodyParser()); //得到post
  app.use(cors()); //跨域
}


//一些一般获取资源的请求
router.use("/users", users);
router.use('/needlog', needLog)
router.use('/info', info)
router.use('/article', article)
router.use('/brick', brick)
router.use('/comment', comment)
//配置路由
app.use(router.routes(), router.allowedMethods());


const options = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/ssl.key")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/ssl.pem"))
};

//定时任务
schedule.scheduleJob('0 0 0 * * *', async () => {
  await userHandler.recoverEditoday()
})





if (config.developMode) {
  app.listen(7865)
} else {
  https.createServer(options, app.callback()).listen(7865)
}

//app.listen(7865)



/* app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "请先登录再尝试\n";
    } else {
      throw err;
    }
  });
}); */