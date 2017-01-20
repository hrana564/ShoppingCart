var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    productID: {type: Number, required:true, unique : true},
    productName:{type: String,
        required: [true,'Product Name is Mandatory.'],
        unique : true
    },
    productCost: {type :Number,
       required: [true,'Product Cost is Mandatory.']
    },
    IsAvaliable: {
        type : Boolean,
        required : [true,'Product Availability is Mandatory.']
    },
    lastUpdatedOn : {type: Date, default: Date.now()}
    lastUpdatedBy: {type : String,required:[true,'Product updated by is Mandatory.']},
});

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;