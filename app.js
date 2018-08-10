const express = require('express');
/*用于全局解析post请求*/
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

/*引入测试服务*/
const test = require('./server/test');

// 将服务路由挂载至服务器
server.use('/',test);


/*对外输出端口号*/
server.listen(3000,()=>{
  console.log('Server is running at http://localhost:3000');
});











// server.use(function (req, res) {
//   res.send({
//     name:'ok'
//   })
//   res.end();
// })
// server.use(express.static('dist'));
/*解决前端跨域的cores方法*/
// var express = require('express');
// var app = express();
// //设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
//
// app.get('/auth/:id/:password', function(req, res) {
//   res.send({id:req.params.id, name: req.params.password});
// });
//
// app.listen(3000);


