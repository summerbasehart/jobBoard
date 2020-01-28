var passport = require('passport');
var config = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Contractor = require("../models/contractor");

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Contractor.find(function (err, contractors) {
      if (err) return next(err);
      res.json(contractors);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Contractor.findById(req.params.id, function (err, contractor) {
    if (err) return next(err);
    res.json(contractor);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Contractor.create(req.body, function (err, contractor) {
    if (err) return next(err);
    res.json(contractor);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Contractor.findByIdAndUpdate(req.params.id, req.body, function (err, contractor) {
    if (err) return next(err);
    res.json(contractor);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
if (token) {
  Contractor.findByIdAndRemove(req.params.id, req.body, function (err, contractor) {
    if (err) return next(err);
    res.json(contractor);
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