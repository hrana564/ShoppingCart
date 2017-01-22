var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    // productID: {type: Number, required:true, unique : true},
    userId:{type: String,
        required: [true,'User ID is Mandatory.']
    },
    CartProducts : {
        type : [String],
        required: [true,'Products are mandatory to place an order.']
    },
    cartCost: {type :Number,
        required: [true,'Cart Cost is Mandatory.']
    },
    orderStatus:{
        type : String,
        default : "Placed"
    },
    IsDelivered: {
        type : Boolean,
        default : false
    },
    lastUpdatedOn : {type: Date, default: Date.now()},
    lastUpdatedBy: {type : String,required:[true,'Product updated by is Mandatory.']}
});

var OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;