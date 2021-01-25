var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入express-session
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

var app = express();
//配置session
app.use(session({
    secret: 'name',//自命名
    resave: false,//发送请求的时候重新保存session
    saveUninitialized: true,//保存初始化状态
    cookie: { maxAge: 1000 * 60 * 60 *24 }//cookie存储在客户端的时间
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 登录拦截
 * 所有访问我们网站的用户如果没有登录，跳转至登录
 * 访问页面时，先获取username——————req.session.userName
 * 如果能获取到，直接访问。如若不能，重定向到登录注册页
 */
app.get('*',(req, res, next) => {// * 通配符，all指所有
  let userName = req.session.userName

  if (!userName) {// 判断用户名是否存在，如果不存在再判断路由
    //判断目前路由路径是在那个页面
    let path = req.path
    //path 获取当前路由路径信息
    if (path !== '/login' && path!== '/signIn') {
      // 如果用户名不存在，当前路由不是登录或者注册页面，就跳转至登录
      // res.redirect('/login')
    }
    
  }
  //使用中间件，需要执行next（），否则页面跳转不过去
  next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
