//1.导入安装包
let mongoose = require('mongoose') //CMD模块化 模块化导入语句

//2.链接数据库，库名-------------默认返回promise
let dbUrl = 'mongodb://localhost/Blog'
mongoose
    .connect(dbUrl)
    .then(() => console.log('数据库链接成功'))
    .catch(err => {console.log('数据库链接失败' + err)})


//模块导出
module.exports = mongoose //CMD模块化导出语句