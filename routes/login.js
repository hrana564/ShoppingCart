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
                request.session.user = resource;
                if(request.session.user.roleID == 1){
                    response.redirect('/admin/dashboard');
                }else if (request.session.user.roleID == 2){
                    response.redirect('/customer/main');
                }else
                response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Invalid user! Please contact system admin."});
            }else{
                response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "<strong>Invalid Credentials!</strong> Please try again."})
            }
        }
    });
});
module.exports = router;