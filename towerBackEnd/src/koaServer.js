const Koa = require("koa");
const Router = require("@koa/router");
const koaBodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const mongoose = require("mongoose");
const enforceHttps = require('koa-sslify').default;
const https = require('https');
const fs = require('fs');
const path = require('path')
const schedule = require('node-schedule');
const app = new Koa();
const router = new Router();
const config = require('../config.js');
const brickPage = require('./routes/brickPage')
const editor = require('./routes/editor')
const login = require('./routes/login')
const mainPage = require('./routes/mainPage')
const searchPage = require('./routes/searchPage')


mongoose.connect(config.developMode?config.localMongoUrl:config.productionUrl
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(e => {
  console.log(e)
});



if (config.developMode) {
  app.use(koaBodyParser()); //得到post
  app.use(cors()); //跨域
} else {
  app.use(enforceHttps());
  app.use(koaBodyParser()); //得到post
  app.use(cors()); //跨域
}


//一些一般获取资源的请求
router.use("/brickpage", brickPage);
router.use('/editor', editor)
router.use('/user', login)
router.use('/mainpage', mainPage)
router.use('/searchpage', searchPage)

app.use(router.routes(), router.allowedMethods());


//导入ssl证书
const options = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/ssl.key")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/ssl.pem"))
};

//启动服务器
if (config.developMode) {
  app.listen(7865)
} else {
  https.createServer(options, app.callback()).listen(7865)
}

//每日任务
const job = schedule.scheduleJob('0 0 0 * *', async () => {
  await infoModel.updateOne({}, {
    visitToday: 0,
    userNew: 0,
    brickNew: 0,
    articleNew: 0
  })
})



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