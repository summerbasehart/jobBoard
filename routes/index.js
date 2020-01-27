var Category = require("../models/category");
var Post = require("../models/post");
var Applicant = require("../models/applicant")
var express = require('express');
var router = express.Router();

router.get('/category', function(req, res, next) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

router.get('/bycategory/:id', function(req, res, next) {
  Post.find({category: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/post', function(req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/post/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/applicant', function(req, res, next) {
  Applicant.find(function (err, applicants) {
    if (err) return next(err);
    res.json(applicants);
  });
});

// router.get('/applicant/:id', function(req, res, next) {
//   Applicant.findById(req.params.id, function (err, applicant) {
//     if (err) return next(err);
//     res.json(applicant);
//   });
// });

// router.post('/join-ost', function(req, res, next){
//   var emailInfo = req.body;
//   if(!emailInfo.name || !emailInfo.email || !emailInfo.phone){
//       res.status(400).send({success: false});
//   } else {
//       mailer.contactEmail2(emailInfo).then(function(info){
//           console.log(info);
//           res.status(200).send({success:true});
//       });
//   }
// });

module.exports = router;