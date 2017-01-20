var nodemailer = require('nodemailer');
var config = require('./config');

var transporter = nodemailer.createTransport(config.emailSetup);
function SendEmail(emailTo, emailCc, emailBcc, emailSubject, emailText,emailHtml,callBack){
    var mailOptions = {
        from: config.mailFrom, // sender address
        to: emailTo, // +' , hrana564@gmail.com', // list of receivers, Comma separated list or an array of recipients e-mail addresses
        cc : emailCc ,  // Comma separated list or an array of recipients e-mail addresses,
        bcc : emailBcc , // Comma separated list or an array of recipients e-mail addresses
        subject: emailSubject, // Subject line
        text: emailText, // plaintext body
        html: emailHtml // html body
    };
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    throw "Error occoured while sending email !!! Please try after some time.";
                }
                console.log('Message sent: ' + info.response);
                callBack();
            });
        }
    });
}
module.exports = {SendRetailEmail : SendEmail};