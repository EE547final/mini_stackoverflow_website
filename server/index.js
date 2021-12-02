require('dotenv').config(); // process.env 文件现在可以具有在.env文件中定义的键和值。
const express = require('express');
const morgan = require('morgan');// morgan 模块可以在command方便的显示客户端详细的请求。
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require('./routes/index.js')(app); // 必须在主文件中引入route
// 前面是路径代表的文件，后面是app就是传入的实参，相当于express() 方法创建的web服务器。
// app.use('./routes');

// app.use('./routes/index.js'); 
require('./routes/index.js')(app); // 必须在主文件中引入route
// const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080; 
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/stackoverflow-clone'; 
// 第一个内容是写在stackoverflow-clone里面的

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true} )
  .then( () => {
    console.log("Successfully connected！");
  })
  .catch( err => {
    console.log(err); 
    console.log("Not connected successfully!");
  })

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); 
})


module.exports = app;