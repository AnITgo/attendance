var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('Leave', new Schema({
    uid:{ type:String, ref:'User'},
    lid:String,
    uname:String,
    userrole:String,
    department:String,
    base_wage:String,
    email:String,
    ltime: String,//离开时间
    atime:String, //返回时间
    ltype:String,//请假类型
    desc:String,//请假描述
    lstatus:String//假期申请状态
}));