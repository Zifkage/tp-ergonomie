import React, { Component } from 'react';
import client from '../../Client';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

  state = {
    isLogoutLoading: false,
    isLogout: false
  }

  handleLogout(){
    var classRef = this;
    classRef.setState({isLogoutLoading: true});
    client.logout(function(err, statusCode, body){
      if(statusCode === 500){
        classRef.setState({isLogoutLoading: false});
        return alert('Problème de connection');
      } 
      classRef.setState({isLogoutLoading: false, isLogout: true});
    });
  }

  render(){
    if(this.state.isLogout){
      return <Redirect to='/login'/>
    }
    if(this.state.isLogoutLoading){
      return <div>loading...</div>
    }

    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={e => this.handleLogout()} >Se déconnecter</button>          
      </div>
    );
  }
}

export default Dashboard;