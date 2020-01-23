var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Applicant = require("../models/applicant");

router.get('/', passport.authenticate('jwt', { session: true}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Applicant.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/:id', passport.authenticate('jwt', { session: true}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;