//编写前台相关的代码
const express = require('express');
const path = require('path');
const db = require('../db.js');

//创建路由对象
const router = express.Router();

// 监听路由
// 显示前台首页
router.get('/index', (req, res) => {
    //1.编写SQL语句  获取ali_cate数据
    const sql = `select*from ali_cate;
                 select*from ali_article order by rand()  limit 0,5;
                 select*from ali_pic;
                 select*from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
                 select * from ali_article  join ali_admin on article_adminid=admin_id join ali_cate on article_cateid=cate_id order by article_addtime desc  limit 0,3;`
    //2.执行SQL语句
    db.query(sql, (err, result) => {
        const data = {
            cate: result[0],
            rand: result[1],
            pic:result[2],
            focus:result[3],
            news:result[4]
        }
        res.render(path.join(rootPath, 'view/index.html'), data);
    })

});

//显示前台文章详情页
router.get('/detail', (req, res) => {
    res.render(path.join(rootPath, 'view/detail.html'));
});

//显示前台列表页
router.get('/list', (req, res) => {
    res.render(path.join(rootPath, 'view/list.html'));
});

module.exports = router;