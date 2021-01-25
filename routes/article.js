var express = require('express');
const { now } = require('mongoose');
const User = require('../models/article');

var router = express.Router();
//添加博客接口
router.post('/add', (req, res, next) => {
    let date = new Date()
    // res.render('add', {date});
    // console.log(date);

    let news = {
        title: req.body.title,
        content: req.body.textarea,
        time: date
    }

    let userI = new User(news)

    // 上传至数据库
    userI.save((err, result) => {
        if (!err) {
            res.send(result)
        }
    })
})




module.exports = router