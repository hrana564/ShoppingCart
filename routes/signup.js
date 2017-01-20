var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var config = require('../utilities/config')

router.get('/',function(request,response){
    response.render('signup.ejs',{AppName:config.AppName,footerSignature:config.footerSignature});
});


router.post('/', function(request, response) {
    var user = new UserModel(request.body);
    user.save(function(err, resource) {
        if (err) {
            console.log('error while saving on database. '+err.errorMessage);
            response.render('signup.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"Internal server error occoured! Please try again later."});
        } else {
            try{
                EmailUitlity.SendRetailEmail(user.email, '', '', 'Welcome to '+config.AppName+'. ✔', '', "Hi "+user.userName+", <br /> Welcome to <b>"+config.AppName+"</b>. <br /> You have been successfully registerd. Please start exploring!", function () {
                response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,successMessage : "<strong>Successfully registered!</strong> Please login to continue."})
            });
            }catch (ex){
                console.log('error while saving on database. '+err.errorMessage);
                response.render('signup.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage:"Error occoured while sending email! Please try again later."});
            }
        }
    });
});

module.exports = router;