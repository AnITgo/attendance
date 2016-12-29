var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('varcation', new Schema({
    v_id: String,
    type:String,
    weight:String
}));