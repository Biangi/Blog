var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
//Response ：响应  Request：请求
router.post('/addUser', function (req, res, next) {
  // res.send('点击了注册');
  console.log(req.body);


let userInfo = {
  userName: req.body.userName,
  password: req.body.password,
  passwordC: req.body.passwordC
}
if(userInfo.password !== userInfo.passwordC){
  console.log('密码不一致')
}

//页面表单数据，放入模型
let userI = new User(userInfo)

// 上传至数据库
userI.save((err, result) => {
  if (!err) {
    res.send(result)
  }
})

});
module.exports = router;