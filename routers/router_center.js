//个人中心相关处理
const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();

//显示profile.html文件   -admin/center/profile.html
router.get('/admin/center/profile',(req,res)=>{
    res.render(path.join(rootPath,'view','admin/center/profile.html'),req.session.userInfo);
})

module.exports = router;