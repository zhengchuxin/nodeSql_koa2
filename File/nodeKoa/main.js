const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router=require('koa-router')
const views = require('koa-views')
const staticCache = require('koa-static-cache')
const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(bodyParser({
  formLimit: '1mb'
}))

//  路由(我们先注释三个，等后面添加好了再取消注释，因为我们还没有定义路由，稍后会先实现注册)
app.use(require('./routers/signup.js').routes())
app.use(require('./routers/signin.js').routes())
app.use(require('./routers/posts.js').routes())
app.use(require('./routers/signout.js').routes())

// 我们可以uncaughtException来全局捕获未捕获的Error，同时你还可以将此函数的调用栈打印出来，捕获之后可以有效防止node进程退出
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

// connection.end();
app.listen(`${config.port}`, function () {    ////监听3002端口
  console.log(`listening on port ${config.port}`)
  // console.log('Server running  main.js  at 3002port');
});

// var loggerAsync = require('./middleware/logger-async')
// var fs = require("fs")
// var app = new Koa();
// app.use(bodyParser())
// app.use(loggerAsync())

// app.use(async(ctx) => {
//     await ctx.set('Access-Control-Allow-Origin','*'); //允许通过所有的 
//     console.log(ctx.url);
//     if (ctx.url === '/?user=srtian&age=18' && ctx.method === 'GET') {
//         let html = `
//         <h2>This is demo2</h2>
//         <form method="POST" action="/">
//             <p>username:</p>
//             <input name="username">
//             <p>age:</p>
//             <input name="age">
//             <p>website</p>
//             <input name="website">
//             <button type="submit">submit</button>                 
//         </form>
//         `
//         ctx.body = html
//     } else if (ctx.url === '/addHero' && ctx.method === 'POST') {
//         let postData = ctx.request.body
//         ctx.body = postData
//     } else {
//         ctx.body = '<h2>404</h2>'
//     }
// })


// // 我们可以uncaughtException来全局捕获未捕获的Error，同时你还可以将此函数的调用栈打印出来，捕获之后可以有效防止node进程退出
// process.on('uncaughtException', function (err) {
//     //打印出错误
//     console.log(err);
//     //打印出错误的调用栈方便调试
//     console.log(err.stack);
// });

// // connection.end();
// app.listen(3002, function () {    ////监听3002端口
//     console.log('Server running  main.js  at 3002port');
// });


//设置跨域访问
//  防止异常出现 
// app.use(async (ctx) => {
//     await ctx.set('Access-Control-Allow-Origin','*'); //允许通过所有的 

//     const url = ctx.url;
//     // 使用 ctx.request
//     const request = ctx.request;
//     const req_query = request.query;
//     const req_querystring = request.querystring;
//      // 直接使用ctx来获取
//      const req_ctx = ctx.query
//      const req_ctx1 = ctx.querystring
//      ctx.body = {
//          url,
//          req_query,
//          req_querystring,
//          req_ctx,
//          req_ctx1,
//      }
//     // await next();
// });


// 11111111111111111111111111111

// function getSyncTime() {
//     return new Promise(resolve => {
//         try {
//             let startTime = new Date().getTime();
//             setTimeout(() => {
//                 let endTime = new Date().getTime(),
//                     data = endTime - startTime;

//                     console.log('=====' + data);
//                 resolve(data);
//             }, 500);
//         } catch (err) {
//             reject(err);
//         }
//     })
// }

// async function getSyncData() {
//     let time = await getSyncTime(),
//     data = `endTime - startTime = ${time}`;
//     return data;
// }

// async function getData() {
//     let data = await getSyncData();
//     console.log('xxxxx' + data);
// }

// getData();

// 22222222222222222222222

// const wait1 = () => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve()
//             console.log("1s later")
//         }, 1000)
//     })
// }

// const wait2 = () => {
//     return new Promise((resolve) => {
//         resolve(setTimeout(() => { 
//             console.log("2s later")
//          }, 2000))
//     })
// }

// async function test() {
//     console.log("0000000")
//     const a = await wait1()
//     console.log("11111111")
//     const b = await wait2()
//     console.log("22222222")
//     console.log("end")
// }
// console.log("start")
// test()

// start
// 0000000
// Server running  main.js  at 3002port
// 1s later
// 11111111
// 22222222
// end
// 2s later
