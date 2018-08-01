/**
 * Created by renka on 2018/7/2.
 */

/*web静态资源服务器*/
const express = require('express');
const server = express();
const proxy = require('http-proxy-middleware');//代理中间件，需要npm install http-proxy-middleware --save -dev

/*挂载打包的静态资源*/
server.use(express.static('./dist'));
/*设置跨域代理*/
server.use('/test',proxy({
  target: "http://localhost:3000",
  changeOrigin: true
}));
/*对外输出端口号*/
server.listen(8081,()=>{
  console.log('Server is running at http://localhost:8081');
});
