var express = require('express');
const moment = require('moment');
var router = express.Router();

let Article = require('../models/article');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let cPage = req.query.page || 1
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.userName || ''

  let data = {
    blogList: [], // 文章列表
    currPage: cPage, // 当前页数
    PagesTotle: '' // 总页数
  }
  // 设定每页数据条数
  let pageSize = 2
  data.blogList = await Article.find()
    .limit(pageSize) //限定展示的条数
    .skip((data.currPage - 1) * pageSize)
    .sort({
      _id: 'desc'
    }) //倒叙
  // console.log(data.blogList);

  //确定共有几条数据
  let blogAll = await Article.find()
  //得出需要分几页
  data.PagesTotle = Math.ceil(blogAll.length / pageSize)
  console.log(blogAll);

  // 转换时间
  data.blogList.map(item => {
    item['tt'] = moment(item.time).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');

    // console.log(t);
  })
  // 文章内容截取
  data.blogList.map(item => {
    // 截取数据库content文本中所有去除空文本以及html标签的
    item['content'] = item.content.trim().replace(/<\/?.+?>/g, "").substring(0, 20)
  })



  res.render('index', {
    userName,
    data
  });
});

//登录路由配置
router.get('/login', function (req, res, next) {
  res.render('login', {});
});

//注册路由配置
router.get('/signIn', function (req, res, next) {
  res.render('signIn', {});
});

//新增路由配置
router.get('/news', function (req, res, next) {
  let userName = req.session.userName || ''
  res.render('news', {
    userName
  });
});

//详情路由配置
router.get('/details', async function (req, res, next) {
  let userName = req.session.userName || ''
  let detaId = req.query._id || ''
  //判断detaId是否为true
  if (detaId) {
    let data = await Article.findOne({
      _id: detaId
    })
    data['tt'] = moment(data.time).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
    res.render('details', {
      userName,
      data
    });
  } else {
    //如果为false
    res.render('details', {
      userName

    });
  }

});
module.exports = router;