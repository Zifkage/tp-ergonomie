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

export default {
  login,
  logout,
  getUser
}