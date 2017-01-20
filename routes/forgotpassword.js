var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var commonFunctions = require('../utilities/functions.js');
var config = require('../utilities/config');

router.get('/',function(request,response){
    response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature})
});


router.post('/', function(request, response) {
    UserModel.findOne({email:request.body.email}, function (err, resource) {
        if (err) {
             response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"<strong>Internal Server Error Occoured!</strong> Please try again later."});
        }if(! resource){
             response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"<strong>Invalid Email Address!</strong> Please try again with valid email."});
        } else {
            var resetString = commonFunctions.RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            resource.resetKey = resetString;
            resource.save(function (error) {
                if(error){
                    response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"<strong>Internal Server Error Occoured!</strong> Please try again later."});
                }else{
                    try{
                        EmailUitlity.SendRetailEmail(request.body.email, '', '', 'Password Reset for '+config.AppName, '', "Hi "+resource.userName+", <br /> Your Reset Password Request for <b>"+config.AppName+" </b>have been precessed successfully.<br /> <a href = '"+config.hostName+"resetPassword/"+resource._id+"/"+resetString +"' >Please click here to reset your password.</a>" , function () {
                        response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,successMessage:"<strong>Password Reset Succeeded!</strong> Please check your mailbox for reset link."});
                        });
                    }
                    catch (ex){
                        console.log(ex);
                        response.render('forgotpassword.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"<strong>Internal Server Error Occoured while sending email!</strong> Please try again later."});
                    }
                }
            });
        }
    });
});
module.exports = router;