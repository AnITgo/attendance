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
var Department = require('./app/models/department');//获取Department model 信息
var Vacation = require('./app/models/Vacation');//获取Vacation model 信息
var Checkin = require('./app/models/Checkin');//获取Checkin model 信息

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
// 路由 ================
// =======================
// 基础路由
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
   

// API 路由 -------------------
// 获取一个 express 的路由实例
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


// 应用apiRoutes，并在前面加前缀 /api
app.use('/api', apiRoutes);

// 返回所有用户信息
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

//登陆认证
apiRoutes.post('/auth', function(req, res) {

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
//查询已申请假期
apiRoutes.get('/app_detection/:uid',function(req, res){


});

//提交请假申请
apiRoutes.post('/application',function(req,res){
    var anapply = new Leave({
        lid:req.body.lid,
        uid:req.body.uid,
        uname:req.body.uname,
        userrole:req.body.userrole,
        department:req.body.department,
        base_wage:req.body.base_wage,
        email:req.body.email,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:req.body.lstatus//假期申请状态
    });
    Leave.findOne({
        uid:req.body.uid
    },function(err,leave){
        if(!leave){
            anapply.save(function(err){
                if (err) throw err;
                console.log('apply successfully');
                res.json("apply successfully");
            });
        }else if(leave.ltime<=req.body.ltime&&leave.atime>=req.body.atime){
            res.json({"状态":"申请时间冲突",
                      "已有申请时间": leave.ltime+"-"+leave.atime});
        }else if(leave.ltime>=req.body.ltime&&leave.atime<=req.body.atime){
            res.json({"状态":"申请时间冲突",
                      "已有申请时间": leave.ltime+"-"+leave.atime});
        }else if(req.body.ltime>=leave.ltime&&req.body.ltime<=leave.atime){
            res.json({"状态":"申请时间冲突",
                      "已有申请时间": leave.ltime+"-"+leave.atime});
        }else if(req.body.atime>=leave.ltime&&req.body.ltime<=leave.atime) {
            res.json({"状态":"申请时间冲突",
                      "已有申请时间": leave.ltime+"-"+leave.atime});
        }   
        else{
            anapply.save(function(err){
                if (err) throw err;
                console.log('apply successfully');
                res.json("添加成功");
            });
        }
    });
 //    anapply.save(function(err){
 //        if (err) throw err;
 //        console.log('apply successfully');
 //        res.json({success:true});
 // });
});

//返回某个请假
    //post方法
    apiRoutes.post('/leaveone',function(req, res){
        Leave.find({
            lid:req.body.lid,
            ltime:req.body.ltime,
            atime:req.body.atime,
            desc:req.body.desc
        },function(err,leave){
            res.json(leave);
        });
    });

//根据uid返回请假列表
    //post方法返回
    apiRoutes.post('/leavelist',function(req, res){
        Leave.find({
            uid:req.body.uid
        },function(err,leave){
            res.json(leave);
        });
    });
    //get方法返回
    apiRoutes.get('/leavelist/:uid',function(req, res){
        Leave.find({
            uid:req.params.uid
        },function(err,leave){
            res.json(leave);
        });
    });
//返回所有请假信息
    apiRoutes.get('/leaves',function(req,res){
    Leave.find({},function(err,leave){
        console.log("leaves successfully!!!");
        res.json(leave);
    });
});

//部门经理审批
apiRoutes.post('/firstPermisson',function(req,res){
    var ltime = req.body.ltime;
    var atime = req.body.atime;
    if ((atime-ltime)<5) {
        Leave.findOne({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:req.body.lstatus //假期申请状态
        }).update({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:"审批成功" //假期申请状态    
        },function(err){
            res.json({"lstatus":"审批成功"});
        });
    }else{
        Leave.findOne({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:req.body.lstatus //假期申请状态
        }).update({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:"待总经理审批" //假期申请状态    
        },function(err){
            res.json({'lstatus':'待总经理审批'});
        });
    }
});
//总经理审批
apiRoutes.post('/secondPermission',function(req, res){
    Leave.findOne({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:req.body.lstatus //假期申请状态 
    }).update({
        uid:req.body.uid,
        ltime: req.body.ltime,//离开时间
        atime:req.body.atime, //返回时间
        ltype:req.body.ltype,//请假类型
        desc:req.body.desc,//请假描述
        lstatus:"审批成功" //假期申请状态 
    },function(err){
            res.json({"lstatus":"审批成功"});
    });
});

//管理员操作
    //查看所有用户信息
    apiRoutes.get('/manager/users',function(req, res){
        User.find({},function(err,user){
            res.json(user);
        });
    });
    //插入用户
    apiRoutes.post('/manager/add_user',function(req, res){
        var nick = new User({
        uid:req.body.uid,
        uname:req.body.uname,
        password: req.body.password,
        userrole:req.body.userrole,
        uvacation:req.body.uvacation,//年假
        department:req.body.department,
        base_wage:req.body.base_wage,
        email:req.body.email
    });
        nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
      });
    });
    //更新用户信息
    apiRoutes.post('/manager/update_user',function(req, res){
        User.findOne({
            uid:req.body.uid,
        }).update({
            uid:req.body.uid,
            uname:req.body.uname,
            password: req.body.password,
            userrole:req.body.userrole,
            uvacation:req.body.uvacation,//年假
            department:req.body.department,
            base_wage:req.body.base_wage,
            email:req.body.email
        },function(err){
            res.json({"User":"update successfully"});
        });
    });
    //删除用户信息
    apiRoutes.post('/manager/delete_user',function(req, res){
        User.findOne({
            uid:req.body.uid
        }).remove({},function(err){
            res.json({"User":"delete successfully"});
        });
    });
    //部门增删改查
    //查看所有部门信息
    apiRoutes.get('/manager/deps',function(req, res){
        Department.find({},function(err,department){
            res.json(department);
        });
    });
    //添加部门
    apiRoutes.post('/manager/add_dep',function(req, res){
        var adep = new Department({
            depid:req.body.depid,
            depname:req.body.depname
    });
        adep.save(function(err) {
        if (err) throw err;
        console.log('Department saved successfully');
        res.json({ success: true });
      });
    });
    //修改部门信息
    apiRoutes.post('/manager/update_dep',function(req, res){
        Department.findOne({
            depid:req.body.depid,
        }).update({
            depid:req.body.depid,
            depname:req.body.depname
        },function(err){
            res.json({"Department":"update successfully"});
        });
    });
    //删除部门
    apiRoutes.post('/manager/delete_dep',function(req, res){
        Department.findOne({
            depid:req.body.depid
        }).remove({},function(err){
            res.json({"Department":"delete successfully"});
        });
    });

    //加班、请假类型增删改查    
    //查看加班、请假类型
     apiRoutes.get('/manager/vacas',function(req, res){
        Vacation.find({},function(err,vacation){
            res.json(vacation);
        });
    });
    //添加加班、请假类型
    apiRoutes.post('/manager/add_vaca',function(req, res){
        var avaca = new Vacation({
            v_id: req.body.v_id,
            type: req.body.type,
            weight: req.body.weight
    });
        avaca.save(function(err) {
        if (err) throw err;
        console.log('Vacation saved successfully');
        res.json({ "Vacation": "saved successfully" });
      });
    });
    //修改加班、请假类型
    apiRoutes.post('/manager/update_vaca',function(req, res){
        Vacation.findOne({
            v_id:req.body.v_id,
        }).update({
            v_id: req.body.v_id,
            type: req.body.type,
            weight: req.body.weight
        },function(err){
            res.json({"Vacation":"update successfully"});
        });
    });
    //删除加班、请假类型
    apiRoutes.post('/manager/delete_vaca',function(req, res){
        Vacation.findOne({
            v_id: req.body.v_id
        }).remove({},function(err){
            res.json({"Vacation":"delete successfully"});
        });
    });
    //打卡功能
    //上班打卡
    apiRoutes.post('/manager/ci_start',function(req, res){
        //var nowdate = new Date().toLocaleTimeString();
        var date = new Date();
        var month = date.getMonth() + 1;
        var cdate = date.getFullYear().toString() + month + date.getDate().toString();
        var starttime = date.getHours().toString()+date.getMinutes().toString();        
        var astart = new Checkin({
                cid:req.body.cid,
                uid:req.body.uid,
                cdate:req.body.cdate,
                starttime:req.body.starttime
        });
        astart.save(function(err){
        if (err) throw err;
            console.log(' starttime checkin successfully');
            res.json({ "starttime": "上班打卡成功" });
        });
    });
    //下班打卡
    apiRoutes.post('/manager/ci_end',function(req, res){
        Checkin.findOne({
                cid:req.body.cid,
                uid:req.body.uid,
                cdate:req.body.cdate,
                starttime:req.body.starttime
        }).update({
            endtime:req.body.endtime   //打卡结束时间
        },function(err){
            res.json({"endtime":"下班打卡成功"});
        });
    });

//get传参测试
    // apiRoutes.get('/test/:uid',function(req, res){
    //     console.log(req.params.uid);
    //     res.json(req.params.uid);
    // });
    // apiRoutes.get('/test',function(req, res){
    //     var uid = req.query.uid;
    //     res.json(uid);
    // });
//连表查询测试
    apiRoutes.get('/test/:uid',function(req, res){
        // Leave.findOne({
        //     uid:req.params.uid
        // }).populate('uid').exec(function(err,leave){
        //     res.json(leave,{
        //         "uname":leave.uid.uname
        //     });
        // });
        Leave.findOne({
            uid:req.params.uid
        }).populate('uid').exec(function(err,leave){
            res.json({
                "uname":leave.uid.uname
            })
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