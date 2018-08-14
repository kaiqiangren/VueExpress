const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据库连接池，防止数据库超过最大连接数
const query=require("./db/db");

/*
 * 增删改查服务路由
 * */
/*新增*/
router.use('/test/add', function (req, res) {
  let sql  ="INSERT INTO user_info (name,country,date,score) VALUES(?,?,?,?);";
  let sqlParams = [
    req.body.name,
    req.body.country,
    req.body.date,
    req.body.score
  ];
  query(sql,sqlParams,function (err,result) {
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
/*删除*/
router.use('/test/delete', function (req, res) {
  let delSql = 'DELETE FROM user_info where id='+req.body.id;
  query(delSql,null, function(err, rows, fields) {
    if(err){
      res.json({
        ok:false,
        message:'删除失败！',
        error:err
      })
    }else{
      res.json({
        ok:true,
        message:'删除成功！'
      })
    }
    res.end();
  })
});
/*编辑*/
router.use('/test/edit', function (req, res) {
  let editSql = 'UPDATE user_info SET name=?,country=?,date=?,score=? WHERE id ='+req.body.id;
  let editSqlParams = [
    req.body.name,
    req.body.country,
    req.body.date,
    req.body.score
  ];
  query(editSql,editSqlParams,function (err,result) {
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
/*查询*/
router.use('/test/query', function (req, res) {
  let pageNumber = req.body.pageNumber;
  let pageSize = req.body.pageSize;
  let start = (pageNumber-1)*pageSize;
  let end = pageNumber*pageSize;
  let sql = "SELECT * FROM user_info ORDER BY score DESC LIMIT "+start+","+end;
  let countSql = "SELECT COUNT(id) FROM user_info";
  const promise = new Promise(function(resolve, reject) {
    query(countSql,null,function (err, rows, fields) {
      resolve(rows);
    })
  }).then((count)=>{
    query(sql,null, function(err, rows, fields) {
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
          info:rows,
          total:count[0]["COUNT(id)"]
        })
      }
      res.end();
    });
  })



});


/*将路由模块输出*/
module.exports = router;
