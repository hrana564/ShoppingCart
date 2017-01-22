var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName:{type: String,
        required: [true,'User Name is Mandatory.'],
        unique : true
    },
    password: {type :String,
       required: [true,'Password is Mandatory.']
    },
    email: {
        type : String,
        required : [true,'Email Address is Mandatory.'],
        unique : true
    },
    roleID : {type: Number, required:true, default:2},
    resetKey: {type : String,default : ''},
    cartProducts : {type :[String], default : []},
    lastUpdatedOn : {type: Date, default: Date.now()}
});

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;