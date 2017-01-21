var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var config = require('../utilities/config')

router.post('/', function(request, response) {
    request.session.destroy();
    response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature});
});

module.exports = router;