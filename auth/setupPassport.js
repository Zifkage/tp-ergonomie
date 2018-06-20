const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    'login',
    new LocalStrategy(
      {
        proxy: true
      },
      function(username, password, done) {
        User.findOne({ username }, function(err, user) {
          if (err) return done(null, false, { message: '500' });
          if (!user) return done(null, false, { message: '404' });
          user.checkPassword(password, function(err, isMatch) {
            if (err) return done(err);
            if (!isMatch) {
              return done(null, false, { message: '404' });
            }
            done(null, user);
          });
        });
      }
    )
  );
};
