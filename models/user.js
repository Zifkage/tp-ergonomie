const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  lastName: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false }
});

//Methods
userSchema.methods.getName = function(){
  return this.username;
}

userSchema.methods.checkPassword = function(guess, done){
  bcrypt.compare(guess, this.password, function(err, isMatch){
    return done(err, isMatch);
  });
}

var noop = function(){};

userSchema.pre('save', function(done){
  var user = this;
  if(!user.isModified('password')) return done();
  bcrypt.genSalt(SALT_FACTOR, function(err, salt){
    if(err) return done(new Error('Internal server error'));
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword){
      if(err) return done(new Error('Internal server error'));
      user.password = hashedPassword;
      done();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
