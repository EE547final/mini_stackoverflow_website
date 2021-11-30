'use strict'; 

const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
// const errorHandler = require('./middlewares/errorHandler'); 
const routers = require('./routers/index'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 3000; 

const DB_URL = 'mongodb://localhost:27017/user' ;

// node.js 使用mongoose操纵MongoDB
// 使用mongoose，需要为每种类型的数据定义Schema和Model。Schema定义了一个数据实体中应该存在每个属性的数据类型。
// MongoDB本身是没有对存入数据类型限定的机制的，而mongoose的Schema中的这种机制，形成了类似于Mysql中定义数据时的类型限定，
// 保证了在MongoDB中存入的数据的规范性。

mongoose.connect(DB_URL , {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log("Successfully connected！");
    })
    .catch(err => {
        console.log(err); 
        console.log("Not connected successfully!");
    })

app.use(express.json()); 
// express.json() 解析JSON格式的请求体数据，
app.use(express.urlencoded({extended: false}));  // 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
// 可以通过body-parser 对象创建中间件，当接收到客户端请求时所有的中间件都会给req.body 添加属性，请求体为空，则解析为空{} （或者出现错误）。
app.use(cors());  // CORS跨域资源共享， 为了让你的服务器可以被其他来源来访问。
app.use('/', routers); 


app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`); 
})


module.exports = app;  