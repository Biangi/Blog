var express = require('express');
const {
    now
} = require('mongoose');
const User = require('../models/article');

// 引入multiparty，multiparty：处理图片上传
let Multiparty = require('multiparty');

// 导入文件
let fs = require('fs')
const {
    format
} = require('morgan');

var router = express.Router();
//添加博客接口
router.post('/add', (req, res, next) => {

    // res.render('add', {date});
    // console.log(date);

    let news = {
        title: req.body.title,
        content: req.body.textarea,
        time: Date.now(),
        userName: req.session.userName
    }

    let userI = new User(news)

    // 上传至数据库
    userI.save((err, result) => {
        if (!err) {
            res.send(result)
        }
    })
})

// 上传文章路由接口
router.post('/load', (req, res, next) => {
    // 图片文件上传的操作
    // console。log(req.body)
    // 实例化Multiparty的form类
    let form = new Multiparty.Form();
    // 使用path，获取文件信息
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }
        // console.log(fields + '第一个');
        // console.log(fields.upload[0]);
        let file = files.upload[0]
        // 将读取到的文件信息，及文件上传到本项目下，也就是服务器
        // 读取文件流
        let rStream = fs.createReadStream(file.path)
        //拼接路径
        let filePath = file.priginalFilename
        // 写入文件流
        let wStream = fs.createReadStream('./public/uploads' + filePath)
        // 出发读写管道，实现上传
        rStream.pipe(wStream)
        // 将文件返回给ckeditor这个插件
        wStream.on('close', () => {
            res.send({
                uploaded: 1,
                url: filePath
            }) //将服务器端图片地址拿给文本框，使得文章能够正确拿到插图
        })
    })
})
module.exports = router