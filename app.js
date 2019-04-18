//1. 加载 express 模块
const express = require('express');
const fs=require('fs');
const path=require('path');
// 2. 创建服务器
const app = express();

// 3.启动服务器
app.listen(3000, ()=> console.log('启动成功'));

//将__dirname 保存在全局作用域中
global.rootPath=__dirname;

//托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//配置模板引擎
app.engine('html',require('express-art-template'));

// 加载body-parser模块,在注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({extended:false}));

//加载express-session模块,并注册为中间件
const session=require('express-session');
app.use(session({
    secret: 'eyfy24fyed',
    resave: false,
    saveUninitialized: false
}))
app.use(checkSession);

// 加载路由模块,在注册为中间价
fs.readdir(path.join(__dirname,'routers'),(err,result)=>{
    if(err){
        return console.log(err);
    }
    for(let i=0;i<result.length;i++){
        let router=require(path.join(__dirname,'routers',result[i]))
        app.use(router);  //注册中间件
    }
})
function checkSession (req, res, next) {
    // /admin/login
    // /admin/checkLogin
    // /admin/cate/cate

    //当路由既不是 /admin/login 又不是 /admin/checkLogin 时，检测session
    //如果是 /admin/login 或者 /admin/checkLogin，直接next

    const allow_url=['/admin/checkLogin','/admin/login','/index','/list','/detail'];
    if (allow_url.includes(req.url)==true) {
        next();
    }else {
         //判断isLogin是否为true
         if (req.session.isLogin != true) {
            //不等于true时说明没有登录，跳转回登录页 （/admin/login）
            return res.redirect('/admin/login');
        }
        next();
    }
}        