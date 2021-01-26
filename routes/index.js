var express = require('express');
var router = express.Router();

let Article = require('../models/article');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await Article.find()
  console.log(data);
  let userName = req.session.userName || ''
  res.render('index', { userName,data});
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
  let userName = req.session.userName || ''
  res.render('news', {userName});
});

//详情路由配置
router.get('/details', function(req, res, next) {
  let userName = req.session.userName || ''
  res.render('details', {userName});
});
module.exports = router;
