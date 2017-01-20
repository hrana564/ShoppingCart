var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var config = require('../utilities/config');

router.get('/:userID/:resetID', function(request, response) {
    UserModel.findOne({_id: mongoose.Types.ObjectId(request.params.userID),resetKey:request.params.resetID}, function (err, resource) {
        if (err) {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Internal Server error!</strong> Please try again later."})
        } if(! resource){
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Invalid attempt!</strong> Please use proper reset link."})
        } else {
            response.render('resetpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,userName : resource.userName})
        }
    });
});

router.post('/:userID/:resetID', function(request, response) {
    UserModel.findOne({_id: mongoose.Types.ObjectId(request.params.userID),resetKey:request.params.resetID}, function (err, resource) {
        if (err) {
             response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Internal Server error!</strong> Please try again later."})
        } if(! resource){
             response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Invalid attempt!</strong> Please use proper reset link."})
        } else {
            resource.password = request.body.password;
            resource.save(function (error,obj) {
                if(error){
                     response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Internal Server error!</strong> Please try again later."})
                }else{
                    response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,successMessage : "<strong>Password Changed Successfully!</strong> Please login to continue."})
                }
            });
        }
    });
});

module.exports = router;