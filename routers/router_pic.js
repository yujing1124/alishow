const express = require('express');
const path = require('path');
const db = require('../db.js');

//创建路由对象
const router = express.Router();

//显示轮播图管理页面
router.get('/admin/other/slides', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/other/slides.html'));
}) 
module.exports=router;