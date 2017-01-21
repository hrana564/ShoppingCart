/**
 * Created by HP PC on 14-01-2017.
 */
var config = require('./config');
module.exports ={

    // RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    RandomAlphaNumericStringGenerator :  function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },

    IsAdminLoggedIn: function (request, response){
        if(request.session.user && request.session.user.roleID == 1){
            return true;
        }else {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
            return false;
        }
    },

    IsCustomerLoggedIn: function(request,response){
        if(request.session.user && request.session.user.roleID == 2){
            return true;
        }else {
            response.render('login.ejs',{AppName:config.AppName,footerSignature:config.footerSignature,errorMessage : "Session expired! Please re-login to continue."});
            return false;
        }
    }
};