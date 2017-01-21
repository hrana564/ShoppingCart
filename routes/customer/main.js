var express = require('express');
var router = express.Router();
var UserModel = require('../../models/user.js');
var commonFunctions = require('../../utilities/functions.js');
var config = require('../../utilities/config');
var ProductModel = require('../../models/products');


router.get('/',function(request,response){
    if(request.session.user && request.session.user.roleID == 2){
        ProductModel.find({},function (err,resource) {
            if(err){
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature});
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource});
            }
        });
    }else{
        response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
    }
});

router.get('/:alertClass/:alertMessage',function(request,response){
    if(request.session.user && request.session.user.roleID == 2){
        ProductModel.find({},function (err,resource) {
            if(err){
                console.error(err);
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource,customMessageClass : request.params.alertClass,customMessage: request.params.alertMessage});
            }
        });
    }else{
        response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
    }
});

router.post('/', function(request, response) {

});
module.exports = router;