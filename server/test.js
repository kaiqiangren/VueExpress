const express = require("express");

const mysql = require("mysql");
//定义路由级中间件
const router = express.Router();

//连接上数据库
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database:'test'
});
db.connect();

//

/*
 * 增删改查服务路由
 * */

router.use('/test/add', function (req, res) {
  let sql  ="INSERT INTO user_info (name,country,date,score) VALUES(?,?,?,?);";
  let sqlParams = [
    req.body.name,
    req.body.country,
    req.body.date,
    req.body.score
  ];
  db.query(sql,sqlParams,function (err,result) {
    if(err){
      res.json({
        ok:false,
        message:'创建失败！'
      })
    }else{
      res.json({
        ok:true,
        id:result.insertId,
        message:'创建成功！'
      })
    }
    res.end();
  })

});
router.use('/test/delete', function (req, res) {
  let delSql = 'DELETE FROM user_info where id='+req.body.id;
  db.query(delSql, function(err, rows, fields) {
    if(err){
      res.json({
        ok:false,
        message:'删除失败！'
      })
    }else{
      res.json({
        ok:true,
        message:'删除成功！'
      })
    }
    res.end();
  });``
});
router.use('/test/edit', function (req, res) {
  let editSql = 'UPDATE user_info SET name=?,country=?,date=?,score=? WHERE id ='+req.body.id;
  let editSqlParams = [
    req.body.name,
    req.body.country,
    req.body.date,
    req.body.score
  ];
  db.query(editSql,editSqlParams,function (err,result) {
    if(err){
      res.json({
        ok:false,
        message:'修改失败！'
      })
    }else{
      res.json({
        ok:true,
        message:'修改成功！'
      })
    }
    res.end();
  })
});
router.use('/test/query', function (req, res) {
  db.query('SELECT * FROM user_info', function(err, rows, fields) {
    if(err){
      res.json({
        ok:false,
        message:'查询失败！',
        info:null
      })
    }else{
      res.json({
        ok:true,
        message:'查询成功！',
        info:rows
      })
    }
    res.end();
  });
});


/*将路由模块输出*/
module.exports = router;
