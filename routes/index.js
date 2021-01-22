var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录路由配置
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

//注册路由配置
router.get('/signIn', function(req, res, next) {
  res.render('signIn', {});
});

//新增路由配置
router.get('/news', function(req, res, next) {
  res.render('news', {});
});

//详情路由配置
router.get('/details', function(req, res, next) {
  res.render('details', {});
});
module.exports = router;
