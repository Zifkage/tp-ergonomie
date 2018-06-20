import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import { Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/hoc/PrivateRoute';
import client from './Client';


class App extends Component {

  state = {
    isLoading: true
  }

  componentDidMount(){
    var { cookies } = this.props;
    var classRef = this;
    client.getUser(function(err, statusCode, user){
      if(statusCode === 404) {
        classRef.setState({isLoading: false});
        return cookies.remove('user');
      }
      if(user) {
        classRef.setState({isLoading: false});
        return cookies.set('user', user);
      }
    });
  }

  render() {
    if(this.state.isLoading) return <div>loading...</div>;

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to='/dashboard'/>} />          
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
