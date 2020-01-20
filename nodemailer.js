const nodemailer = require('nodemailer');
const Q = require('q');


exports.contactEmail = function (name, email, message) {
    const smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: 'dispatch@ostadvantage.com',
            pass: '1650PellisierRoad'
        }
    });
    const mailOptions = {
        from: email,
        //to: 'jadeva@brimstech.com',
        to: 'applicant@ostadvantage.com',
        subject: 'JOIN OST Website Contact From: ' + name,
        html: message
//        attachments: pdfsReceipts
    };

// send mail with defined transport object
    let dfd = Q.defer();
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            dfd.reject();
        } else {
            dfd.resolve();
        }

        // if you dont want to use this transport object anymore, uncomment the follwoing line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
    return dfd.promise;
};

exports.contactEmail2 = function (emailInfo){

    'use strict';
    let dfd = Q.defer();
// create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dispatch@ostadvantage.com',
            pass: '1650PellisierRoad'
        }
    });
    const message = 'Name: ' + emailInfo.name + '\n' +
                    'Company: ' + emailInfo.company + '\n' +
                    'Email: ' + emailInfo.email + '\n' +
                    'Phone: ' + emailInfo.phone + '\n' +
                    'Message: ' + emailInfo.message + '\n';
// setup email data with unicode symbols
    const mailOptions = {
        from: '"OST Dispatch " <dispatch@ostadvantage.com>', // sender address
        to: 'applicant@ostadvantage.com', // list of receivers
        subject: 'JOIN OST Website From: ' + emailInfo.name, // Subject line
        text: message // plain text body
    };

// send mail with defined transport object
    console.log('From nodemailer object: ',message);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        dfd.resolve(info);
    });

    return dfd.promise;
};
