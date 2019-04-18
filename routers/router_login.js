//编写登录的代码
const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();
// 监听路由

//显示后台登录页
router.get('/admin/login', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/login.html'));
});



//验证登录信息
router.post('/admin/checkLogin', (req, res) => {
    //1.接收数据--用户名和密码
    const email = req.body.email;
    const passwd = req.body.passwd;
    //2.编写sql
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?';
    //3.执行sql
    db.query(sql,[email,passwd],(err,result)=>{
        //4.处理sql
        if(err||result.length!=1){
            //登录失败
            return res.send({code:201,message:"登录失败"});
        }
        req.session.isLogin=true;
        req.session.userInfo=result[0];
        res.send({code:200,message:"登录成功"});
    })
    
})

//退出登录
router.post('/admin/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            return res.send({code:201,message:"退出失败"});
        }
         res.send({code:200,message:"退出成功"});
    })
})

//显示后台首页
router.get('/admin/index', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/index.html'));
});

module.exports = router;