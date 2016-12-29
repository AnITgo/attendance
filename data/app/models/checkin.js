var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('checkin', new Schema({
    cid:String,
    uid:String,
    cdate:String,
    starttime:String,//打卡开始时间
    endtime:String   //打卡结束时间
}));