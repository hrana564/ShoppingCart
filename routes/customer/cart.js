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
                response.render('customer/cart',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('customer/cart',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource,cartProducts : request.session.user.cartProducts,customMessageClass : request.params.alertClass,customMessage: request.params.alertMessage});
            }
        });
    }
});

router.get('/',function(request,response){
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                response.redirect('/customer/cart/alert-danger/Internal server error occoured! Please try again later.');
            } else{
                response.render('customer/cart',{AppName:config.AppName,footerSignature:config.footerSignature,productList:resource,cartProducts : request.session.user.cartProducts});
            }
        });
    }
});

router.post('/', function(request, response) {
    if(commonFunctions.IsCustomerLoggedIn(request,response)){
        if(request.body.productIDRFC){
            UserModel.findOne({email:request.session.user.email},function (err,resource) {
                resource.cartProducts.splice(resource.cartProducts.indexOf(request.body.productIDRFC),1);
                resource.save(function (err,resource) {
                   if(err){
                       response.redirect('/customer/cart/alert-danger/Internal server error occoured! Please try again later.');
                   } else{
                       request.session.user = resource;
                       response.redirect('/customer/cart/alert-success/Product was successfully removed from your cart.');
                   }
                });
            });
        }
    }
});
module.exports = router;