var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../../models/user.js');
var config = require('../../utilities/config');
var commonFunctions = require('../../utilities/functions.js');
var ProductModel = require('../../models/products');

router.get('/:alertClass/:alertMessage',function(request,response){
    if(commonFunctions.IsAdminLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                console.error(err);
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource,customMessageClass : request.params.alertClass,customMessage: request.params.alertMessage});
            }
        });
    }
});

router.get('/',function(request,response){
    if(commonFunctions.IsAdminLoggedIn(request,response)){
        ProductModel.find({},function (err,resource) {
            if(err){
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,customMessageClass:"alert-danger",customMessage:"Internal server error occoured! Please try again later."});
            } else{
                response.render('admin/dashboard',{AppName:config.AppName,footerSignature:config.footerSignature,productList : resource});
            }
        });
    }
});

router.post('/', function(request, response) {
    if(commonFunctions.IsAdminLoggedIn(request,response)){
        // Edit the product
        if(request.body.productID && request.body.productName){
            ProductModel.findOne({'_id':mongoose.Types.ObjectId(request.body.productID)},function (err,resource) {
                resource.productCost = request.body.productCost;
                resource.IsAvaliable = request.body.IsAvaliable;
                resource.save(function (err,resource) {
                    if(err){
                        console.log(err);
                        response.redirect('/admin/dashboard/alert-danger/Error occoured while editing product');
                    }else{
                        commonFunctions.RefreshProducts(request,response);
                        response.redirect('/admin/dashboard/alert-success/Product was edited successfuully.');
                    }
                });
            });
        }
        // Delete the product
        else if (request.body.productID && (!request.body.productName)){
            ProductModel.remove({ '_id':mongoose.Types.ObjectId(request.body.productID)}, function(err) {
                if (err) {
                    console.log(err);
                    response.redirect('/admin/dashboard/alert-danger/Error occoured while deleting product');
                }
                else {
                    commonFunctions.RefreshProducts(request,response);
                    response.redirect('/admin/dashboard/alert-success/Product was deleted successfuully.');
                }
            });
        }
        // Add a product
        else {
            var product = new ProductModel(request.body);
            product.lastUpdatedBy = request.session.user.userName;
            product.save(function (err,resource) {
                if(err){
                    console.log(err);
                    response.redirect('/admin/dashboard/alert-danger/Error occoured while adding product');
                } else{
                    response.redirect('/admin/dashboard/alert-success/Successfully saved your product to database.');
                }
            });
        }
    }
});
module.exports = router;