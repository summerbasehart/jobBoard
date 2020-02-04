var Category = require("../models/category");
var Page = require("../models/page");
var Post = require("../models/post");
var Applicant = require("../models/applicant");
var Contractor = require("../models/contractor");
var Blog = require("../models/blog")

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

router.get('/page', function(req, res, next) {
  Page.find(function (err, pages) {
    if (err) return next(err);
    res.json(pages);
  });
});

router.get('/page/:id', function(req, res, next) {
  Post.find({page: req.params.id}, function (err, page) {
    if (err) return next(err);
    res.json(page);
  });
});

// router.get('/bycategory/:id', function(req, res, next) {
//   Post.find({category: req.params.id}, function (err, posts) {
//     if (err) return next(err);
//     res.json(posts);
//   });
// });

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

router.get('/blog', function(req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
    res.json(blogs);
  });
});

router.get('/blog/:id', function(req, res, next) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) return next(err);
    res.json(blog);
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