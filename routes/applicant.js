var passport = require('passport');
var config = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Applicant = require("../models/applicant");

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.find(function (err, applicants) {
      if (err) return next(err);
      res.json(applicants);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Applicant.findById(req.params.id, function (err, applicant) {
      if (err) return next(err);
      res.json(applicant);
    });
    // Applicant.findByPost(req.params.post, function (err, post) {
    //   if (err) return next(err);
    //   res.json(post);
    //   });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Applicant.create(req.body, function (err, applicant) {
    if (err) return next(err);
    res.json(applicant);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Applicant.findByIdAndUpdate(req.params.id, req.body, function (err, applicant) {
    if (err) return next(err);
    res.json(applicant);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Applicant.findByIdAndRemove(req.params.id, req.body, function (err, applicant) {
    if (err) return next(err);
    res.json(applicant);
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