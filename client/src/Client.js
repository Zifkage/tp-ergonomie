import request from 'request';
var uri = 'http://localhost:3000/api/';

const login = function(username, password, cb) {
  request.post({
    url: uri+'login',
    form: {username, password}
  }, function(err, res, body){
    cb(err, res.statusCode,body);
  });
}

const logout = function(cb) {
  request.get({
    url: uri+'logout'
  }, function(err, res, body){
    cb(err, res.statusCode, body)
  });
}

const getUser = function(cb){ 
  request.get({
    url: uri+'current-user'
  }, function(err, res, body){
    cb(err, res.statusCode, body)
  });
}

const newDepo = function(personId, depo, cb){
  request.post({
    url: uri + 'new-depo/' + personId,
    form: depo
  }, function(err, res, body){
    cb(err, res.statusCode, body)
  });
}

const newPerson = function(person, cb){
  request.post({
    url: uri + 'new-person',
    form: person
  }, function(err, res, body){
    cb(err, res.statusCode, body)
  });
}



export default {
  login,
  logout,
  getUser,
  newDepo,
  newPerson
}