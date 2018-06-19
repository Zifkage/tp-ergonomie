const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const routes = require('./routes');
const setupPassport = require('./auth/setupPassport');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/ergonomie');

User.find().exec(function(err, users) {
  if (!users[0]) {
    var newUser = new User({
      username: 'Nazif Barassounon', 
      password: 'abc',
      name: 'Nazif',
      lastName: 'Barassounon',
      admin: true
    });
    newUser.save();
  }
});

setupPassport();

const app = express();

app.set('port', 5000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'RKjdlk(-ps$^lkdjzéfkç__=édl;l!sjrssae58rajfnh',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});
