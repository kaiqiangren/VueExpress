/**
 * Created by renkaiqiang on 2018/12/17.
 */

/*多集群模式请使用 pm2 start app.js -i max 命令*/
//输出配置
module.exports = {
  apps : [{
    script      : "./app.js",
    instances  : 'max',  //文件修改后自动重启服务器
    exec_mode : "cluster", //多集群模式
  }]
}
