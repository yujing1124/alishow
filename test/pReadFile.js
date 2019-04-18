const fs=require('fs');


let p=new Promise(function(resolve,reject){
    //执行异步代码
    fs.readFile('./file.a.text','utf-8',(err,data)=>{
        if(err){
            return reject(err);
        }
        resolve(data);
    })
});

p
.then(function(args1){
    console.log(args1+'==>'+'~');
})
.catch(function(args2){
    console.log('错误信息为'+'args2');
})