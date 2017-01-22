var config = require('./config');
var mongoose = require('mongoose');
var ProductModel = require('../models/products');
var UserModel = require('../models/user.js');
module.exports ={

    // RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    RandomAlphaNumericStringGenerator :  function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },

    IsAdminLoggedIn: function (request, response){
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        response.header('Expires', '-1');
        response.header('Pragma', 'no-cache');
        if(request.session.user && request.session.user.roleID == 1){
            return true;
        }else {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
            return false;
        }
    },

    IsCustomerLoggedIn: function(request,response){
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        response.header('Expires', '-1');
        response.header('Pragma', 'no-cache');
        if(request.session.user && request.session.user.roleID == 2){
            return true;
        }else {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
            return false;
        }
    },
    SessionExpired:function (request,response,errorString) {
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        response.header('Expires', '-1');
        response.header('Pragma', 'no-cache');
        if(errorString){
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : errorString});
        }else{
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
        }
    },
    RefreshProducts : function (request,response) {
        ProductModel.find({IsAvaliable:true},'id',function (err,productList) {
            UserModel.find({},function (err,dbUsers) {
                dbUsers.forEach(function (singleUser,userIndex) {
                    for(var i=0;i<singleUser.cartProducts.length;i++){
                        var flag = 0;
                        for(var j=0;j<productList.length;j++){
                            if(productList[j]._id==singleUser.cartProducts[i]){
                                flag = 1;
                            }
                        }
                        if(flag==0){
                            singleUser.cartProducts.splice(singleUser.cartProducts.indexOf(singleUser.cartProducts[i]),1);
                        }
                    }
                    singleUser.save(function (err) {
                        if(err){
                            console.log(err);
                        }
                    });
                });
            });
        });
    }
};