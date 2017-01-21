var express = require('express');
var router = express.Router();
var UserModel = require('../../models/user.js');
var commonFunctions = require('../../utilities/functions.js');
var config = require('../../utilities/config');
var ProductModel = require('../../models/products');


router.get('/:alertClass/:alertMessage',function(request,response){
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                console.error(err);
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource,customMessageClass : request.params.alertClass,customMessage: request.params.alertMessage});
            }
        });
    }
});

router.get('/',function(request,response){
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,productList:resource});
            }
        });
    }
});

router.post('/', function(request, response) {
    if(commonFunctions.IsCustomerLoggedIn(request,response)){

    }
});
module.exports = router;