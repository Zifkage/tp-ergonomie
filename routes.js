const express = require('express');
const passport = require('passport');

const User = require('./models/user');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/api/login?success=true',
    failureRedirect: '/api/login?success=false',
    failureFlash: true
  })
);

router.get('/login', function(req, res) {
  if (req.query.success == 'true') {
    return res.status(200).json(req.user);
  }
  res.status(400).json({ done: false });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({ done: true });
});

router.get('/current-user', function(req, res) {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(404).send(null);
});

module.exports = router;
