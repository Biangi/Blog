var express = require('express');
const User = require('../models/user');
//引入joi
const Joi = require('joi');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
//Response ：响应  Request：请求
router.post('/addUser', async function (req, res, next) {
  // res.send('点击了注册');
  console.log(req.body);


  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    passwordC: req.body.passwordC
  }
  // if (userInfo.password !== userInfo.passwordC) {
  //   console.log('密码不一致')
  // }

  //验证信息


  const schema = Joi.object({
      userName: Joi.string()
        // .alphanum()
        .min(2)
        .max(12)
        .required()
        .error(new Error('用户名不符合验证规则')),

      password: Joi.string()
        .regex(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
        .required()
        .error(new Error('密码格式不符合要求')),

      passwordC: Joi.ref('password'),
    })
    // .with('username', 'birth_year')
    // .xor('password', 'access_token')
    // .with('password', 'passwordC');


  // schema.validate({
  //   userName: 'abc',

  // });
  // -> { value: { username: 'abc', birth_year: 1994 } }

  // schema.validate({});
  // -> { value: {}, error: '"username" is required' }

  try {
    const value = await schema.validateAsync(
      userInfo
);
  } catch (err) {
    console.log(err.message);
  }



  //准备上传数据库
  //页面表单数据，放入模型
  let userI = new User(userInfo)

  // 上传至数据库
  userI.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })

});

// 登录——————查询
router.post('/login',function (req, res, next) {
  let userInfo = {
    userName:req.body.userName,
    password:req.body.password
  }
  // console.log(req.body.userName);
  User.findOne(userInfo,function (err, result) {
    if (err) {
      return console.log(err);
    }
    if (result == null) {
      console.log('登录失败');
      res.redirect('/signIn')
    }else{
      // 将用户登录信息存储
      req.session.userName = userInfo.userName

      console.log('登录成功');
      res.redirect('/')

    }
  })
})
module.exports = router;