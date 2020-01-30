const nodemailer = require('nodemailer');
const Q = require('q');

var  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'dispatch@ostadvantage.com',
  pass = process.env.MAILER_PASSWORD || '1650PellisierRoad'
  nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./api/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));


exports.forgot_password = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: email,
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: 'http://localhost:3000/auth/reset_password?token=' + token,
            name: user.fullName.split(' ')[0]
          }
        };
  
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };


// exports.contactEmail = function (name, email, message) {
//     const smtpTransport = nodemailer.createTransport('SMTP', {
//         service: 'Gmail',
//         auth: {
//             user: 'dispatch@ostadvantage.com',
//             pass: '1650PellisierRoad'
//         }
//     });
//     const mailOptions = {
//         from: email,
//         //to: 'jadeva@brimstech.com',
//         to: 'applicant@ostadvantage.com',
//         subject: 'JOIN OST Website Contact From: ' + name,
//         html: message
// //        attachments: pdfsReceipts
//     };

// // send mail with defined transport object
//     let dfd = Q.defer();
//     smtpTransport.sendMail(mailOptions, function (err, response) {
//         if (err) {
//             console.log(err);
//             dfd.reject();
//         } else {
//             dfd.resolve();
//         }

//         // if you dont want to use this transport object anymore, uncomment the follwoing line
//         smtpTransport.close(); // shut down the connection pool, no more messages
//     });
//     return dfd.promise;
// };

// exports.contactEmail2 = function (emailInfo){

//     'use strict';
//     let dfd = Q.defer();
// // create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'dispatch@ostadvantage.com',
//             pass: '1650PellisierRoad'
//         }
//     });
//     const message = 'Name: ' + emailInfo.name + '\n' +
//                     'Company: ' + emailInfo.company + '\n' +
//                     'Email: ' + emailInfo.email + '\n' +
//                     'Phone: ' + emailInfo.phone + '\n' +
//                     'Message: ' + emailInfo.message + '\n';
// // setup email data with unicode symbols
//     const mailOptions = {
//         from: '"OST Dispatch " <dispatch@ostadvantage.com>', // sender address
//         to: 'applicant@ostadvantage.com', // list of receivers
//         subject: 'JOIN OST Website From: ' + emailInfo.name, // Subject line
//         text: message // plain text body
//     };

// // send mail with defined transport object
//     console.log('From nodemailer object: ',message);
//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//         dfd.resolve(info);
//     });

//     return dfd.promise;
// };
