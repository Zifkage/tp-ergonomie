const express = require('express');
const passport = require('passport');

const User = require('./models/user');
const Deposition = require('./models/deposition');
const Personne = require('./models/personne');


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

router.post('/new-person', function(req, res, next){
  Personne.findOne({nom: req.body.nom, prenom: req.body.prenom }).exec(function(err, person){
    if(person) return res.json({id: person._id});
    (new Personne(req.body)).save(function(err, newPerson){
      if(err) return next(err);
      res.json({id: newPerson._id})
    });
  });
});

router.post('/new-depo/:personId', function(req, res, next){
  Personne.findById(req.params.personId).exec(function(err, person){
    if(err) next(err);
    (new Deposition({
      ...req.body,
      user: req.user._id,
      personne: person._id 
    })).save(function(err){
      res.status(200).end();
    });
  });
});

module.exports = router;
