var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var config = require('../utilities/config');


router.get('/',function(request,response){
    response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature})
});

router.post('/', function(request, response) {
    UserModel.findOne({userName: request.body.userName, password: request.body.password}, function (err, resource) {
        if (err) {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Internal Server error!</strong> Please try again later."})
        } else {
            if(resource){
                response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,successMessage : "Logged in successfully!."})
            }else{
                response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Invalid Credentials!</strong> Please try again."})
            }
        }
    });
});
module.exports = router;