var express = require('express');
var router = express.Router();
const {
    now
} = require('mongoose');
let Article = require('../models/article');


// 引入multiparty，multiparty：处理图片上传
let Multiparty = require('multiparty');

// 导入文件
let fs = require('fs')
const {
    format
} = require('morgan');


//添加博客接口
router.post('/add', (req, res, next) => {

    // res.render('add', {date});
    // console.log(date);
    let nId = req.body.dId || '';
    console.log(nId);

    //新增
    if (!nId) {
        var articleData = {
            title: req.body.title,
            content: req.body.textarea,
            time: Date.now(),
            userName: req.session.userName
        }
        let articleDbdate = new Article(articleData)

        //保存
        articleDbdate.save((err, result) => {
            if (!err) {
                res.redirect('/')
            }
        })
    } else { //编辑
        let page = req.body.page
        // _id  查找一条数据并修改内容
        // 新数据获取
        let articleData = {
            title: req.body.title,
            content: req.body.textarea,
        }

        Article.findByIdAndUpdate(nId, articleData, {new:true}, (err, result) => {
            if (!err) {
                res.redirect(`/?page=${page}`)
            }
        })
    }


    // let userI = new Article(news)

    // // 上传至数据库
    // userI.save((err, result) => {
    //     if (!err) {
    //         // res.send(result)
    //         res.redirect('/deta')
    //     }
    // })
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
        let filePath = '/uploads/' + file.originalFilename
        console.log(filePath);
        // 写入文件流
        let wStream = fs.createWriteStream('./public' + filePath)
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


// 删除文章接口
router.get('/delete',(req,res,next) => {
    let id = req.query._id
    let page = req.query.page
    console.log(id,page);
    // 删除一条数据
    Article.deleteOne({_id:id}, (err,result) => {
        if (!err) {
            res.redirect(`/?page${page}`)
        }
    })
})
module.exports = router