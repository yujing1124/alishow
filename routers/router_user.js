//完成管理员增删改查
const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();

//显示users.html页面   --view/admin/user/users.html
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/user/users.html'));
})

//查询管理员列表
router.get('/admin/user/getUsers', (req, res) => {
    //1.编写sql语句
    const sql = 'select * from ali_admin';
    //2.执行sq语句
    db.query(sql, (err, result) => {
        //3.处理sql执行结果
        if (err) {
            return res.send({ code: 201, message: "查询管理员列表失败" });
        }
        res.send({ code: 200, message: "查询管理员列表成功", data: result });
    })
})

//显示添加新管理员的页面  --view/admin/user/adduser.html
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/user/adduser.html'));
})


//添加新管理员
router.post('/admin/user/addUserDeal', (req, res) => {
    //1.接收表单数据
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    }
    console.log(data);
    //2.编写sql
    const sql = 'insert into ali_admin set ?';
    //3.执行sql
    db.query(sql, data, (err, result) => {
        //4.处理sql
        if (err || result.affectedRows != 1) {
            return res.send({ code: 201, message: "添加新管理员失败" });
        }
        res.send({ code: 200, message: "添加新管理员成功" });
    });
});


//批量删除按键后端操作  /admin/user/delusers
router.post('/admin/user/delusers', (req, res) => {
    //1.接收数据-id字符串
    const ids = req.body.ids;
    //2.编写sql语句
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    //3.执行sql语句
    db.query(sql, (err, result) => {
        //4.处理sql执行结果并且把结果(成功或者失败)返回前端
        if (err) {
            return res.send({ code: 201, message: "批量删除列表失败" });
        }
        return res.send({ code: 200, message: "批量删除列表成功" });
    });
});


//显示管理员编辑页面   /admin/user/edituser
router.get('/admin/user/edituser', (req, res) => {
    //1.接收数据  admin_id
    const admin_id = req.query.id;
    //2.编写sql语句
    const sql = 'select*from ali_admin where admin_id=?'
    //3.执行sql语句
    db.query(sql, admin_id, (err, result) => {
        res.render(path.join(rootPath, 'view', 'admin/user/edituser.html'), result[0]);
    })
})

//修改管路员信息 /admin/user/modifyuser
router.post('/admin/user/modifyuser', (req, res) => {
    //1.接收数据
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_tel: req.body.tel,
        admin_state: req.body.state,
    }
    // console.log(data);
    const admin_id = req.body.id;
    //2.编写sql
    const sql = 'update ali_admin set? where admin_id=?';
    //3.执行sql
    db.query(sql, [data, admin_id], (err, result) => {
        if (err || result.affectedRows != 1) {
            return res.send({code:201, message:"修改管理员信息失败"});
        }
        res.send({code:200, message:"修改管理员信息成功"});
    })
})
module.exports = router;


