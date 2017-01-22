var config = require('./config');
module.exports ={

    // RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    RandomAlphaNumericStringGenerator :  function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },

    IsAdminLoggedIn: function (request, response){
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        reresponses.header('Expires', '-1');
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
    }
};