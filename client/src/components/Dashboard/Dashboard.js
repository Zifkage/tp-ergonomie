import React, { Component } from 'react';
import client from '../../Client';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';


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
        
        <nav className="nav-bar" >
          <h1>Dashboard</h1>
          <div className="separator"></div>
          <ul>
            <li><NavLink exact to='/dashboard'> <i className="glyphicon glyphicon-pencil"></i>Formulaire de déposition </NavLink></li>
            <li><NavLink to="/dashboard/liste-depositions"> <i className="glyphicon glyphicon-list"></i> Listes des dépositions </NavLink></li>
            <li><NavLink to="/dashboard/ajout-utilisateur"> <i className="glyphicon glyphicon-user"></i> Création d'utilisateur </NavLink></li>
            <li><NavLink to="/dashboard/configuration"> <i className="glyphicon glyphicon-cog"></i> Configuration </NavLink></li>
            <li onClick={e => this.handleLogout()}><i className="glyphicon glyphicon-log-out"></i> Se déconnecté</li> 
          </ul>
        </nav> 
        <div className="content">
          <Switch>
            <Route exact path="/dashboard" render={() => {
              return(
                <h1>ajout-deposition</h1>
              );
            }} />
            <Route exact path="/dashboard/liste-depositions"  render={() => {
              return(
                <h1>liste-depositions</h1>
              )
            }} />
            <Route exact path="/dashboard/ajout-utilisateur" render={() => {
              return(
                <h1>ajout-utilisateur</h1>
              )
            }} />
            <Route exact path="/dashboard/configuration" render={() => {
              return(
                <h1>configuration</h1>
              )
            }} />      
          </Switch>
        </div>         
      </div>
    );
  }
}
 
export default Dashboard;