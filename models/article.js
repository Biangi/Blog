//引入数据库链接
let mongoose = require('../mongodb/db')

//创建规范
let Schema = mongoose.Schema

let userSchema = new Schema({
    title: String,
    content: String,
    time:Date,
    userName:String
    // img:Img
})

// Model——————将会生成数据库集合名（复数）
let User = mongoose.model('article',userSchema)

module.exports = User