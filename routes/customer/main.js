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
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,cartCount:request.session.user.cartProducts.length,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource,cartProducts : request.session.user.cartProducts,cartCount:request.session.user.cartProducts.length,customMessageClass : request.params.alertClass,customMessage: request.params.alertMessage});
            }
        });
    }
});

router.get('/',function(request,response){
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",cartCount:request.session.user.cartProducts.length,customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,productList:resource,cartProducts : request.session.user.cartProducts,cartCount:request.session.user.cartProducts.length});
            }
        });
    }
});

router.post('/', function(request, response) {
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        UserModel.findOne({'email':request.session.user.email},function (err,resource) {
           if(err){
               response.render('customer/main',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
           } else if (!resource){
               request.session.destroy();
               commonFunctions.SessionExpired(request,response);
           }else{
               resource.cartProducts.push(request.body.productIDATC);
               resource.save(function (err,resource) {
                   if(err){
                       response.redirect('/customer/main/alert-danger/Internal server error occoured! Please try again later.');
                   }else{
                        request.session.user = resource;
                        response.redirect('/customer/main/alert-success/Product added to cart successfully.');
                   }
               });
           }
        });
    }
});
module.exports = router;