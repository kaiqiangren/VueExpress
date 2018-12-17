/**
 * Created by renkaiqiang on 2018/12/17.
 */
//nodejs原生os模块
const os = require('os')
//获取cpus核心数
const cpus = os.cpus().length;

//输出配置
module.exports = {
  apps : [{
    name        : "process",
    script      : "./app.js",
    watch       : false,
    instances  : cpus/2,  //文件修改后自动重启服务器
    // exec_mode : "cluster", //多集群模式
    error_file:"log/nodejs/pm2-err.log",//错误输出日志
    out_file:"log/nodejs/pm2-out.log" //日志
  }]
}
