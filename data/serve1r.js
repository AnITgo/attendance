/**
 * Created by waitfish on 15/5/11.
 */
// =======================
// 声明我们需要的模块 ============
// =======================


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要
var config = require('./config'); //读取配置文件config.js信息
var User = require('./app/models/user'); //获取 User model 信息
var Leave = require('./app/models/leave');//获取Leave model 信息
// =======================
// 配置 =========
// =======================
var port = process.env.PORT || 8080; // 设置启动端口
mongoose.connect(config.database); // 连接数据库
app.set('superSecret', config.secret); // 设置app 的超级密码--用来生成摘要的密码

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

// =======================
// 路由 ================
// =======================
// 基础路由

//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


//添加测试数据

app.get('/setup', function(req, res) {

  // 创建一个测试用户
  var nick = new User({
    uid:'111111',
    uname:'王小二',
    password: 'wang',
    userrole:'2',
    uvacation:'5',//年假
    department:'营销部',
    base_wage:'1000',
    email:'111111@163.com'
    //name: 'waitifsh',
    //password: 'test',
    //admin: true
  });

  // 将测试用户保存到数据库
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});
app.get('/setleave',function(req, res){
    var vtest = new Leave({
        uid:'111111',
        ltime: '20161218',//离开时间
        atime:'20161225', //返回时间
        ltype:'婚假',//请假类型
        desc:'我要份子钱',//请假描述
        lstatus:'未批准'
    });
     vtest.save(function(err){
        if (err) throw err;
        console.log('Leave saved successfully');
        res.json({success:true}); 
    });
});
   




// API 路由 -------------------
// 获取一个 express 的路由实例
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// 返回所有用户信息
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// 应用apiRoutes，并在前面加前缀 /api
app.use('/api', apiRoutes);

//认证接口
apiRoutes.post('/auth', function(req, res) {
    console.log(req.body.uid);
    // find the user
    User.findOne({
        uid: req.body.uid
    }, function(err, user) {

        console.log(user);
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: '认证失败，工号找不到' });
        } else if (user) {

            // 检查密码
            if (user.password != req.body.password) {
                res.json({ success: false, message: '认证失败，密码错误' });
            } else {
                
                // 创建token
                var token = jwt.sign(user, app.get('superSecret'), {
                    //expiresInMinutes: 1440 // 设置过期时间
                });

                // json格式返回token
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user:user
                });
            }

        }

    });
});
apiRoutes.post('/apply',function(req,res){
    var anapply = new Leave({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:req.body.lstatus//假期申请状态
    });
    anapply.save(function(err){
        if (err) throw err;
        console.log('apply successfully');
        res.json({success:true});
 });

});


apiRoutes.use(function(req, res, next) {

    //检查post的信息或者url查询参数或者头信息
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // 解析 token
    if (token) {

        // 确认token
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'token信息错误.' });
            } else {
                // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // 如果没有token，则返回错误
        return res.status(403).send({
            success: false,
            message: '没有提供token！'
        });

    }
});

// =======================
// 启动服务 ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);