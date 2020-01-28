var Category = require("../models/category");
var Post = require("../models/post");
var Applicant = require("../models/applicant")
var Contractor = require("../models/contractor")

var express = require('express');
var router = express.Router();

router.get('/category', function(req, res, next) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

router.get('/category/:id', function(req, res, next) {
  Post.find({category: req.params.id}, function (err, category) {
    if (err) return next(err);
    res.json(category);
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

router.get('/contractor', function(req, res, next) {
  Contractor.find(function (err, contractors) {
    if (err) return next(err);
    res.json(contractors);
  });
});

module.exports = router;