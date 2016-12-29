var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('User', new Schema({
    //uid:{ type:String, ref:'Leave'},
    uid:String,
    uname:String,
    password: String,
    userrole:String,
    uvacation:String,//年假
    department:String,
    base_wage:String,
    email:String
}));