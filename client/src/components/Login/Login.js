import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import client from '../../Client';

class Login extends Component {
  state = {
    fields: {
      username: '',
      password: ''
    },
    isLoading: false,
    success: false,
    message: ''
  };

  handleInputChange(e, field) {
    var oldFields = { ...this.state.fields };
    const value = e.target.value;

    switch (field) {
      case 'username':
        this.setState({ fields: { ...oldFields, username: value } });
        break;
      case 'password':
        this.setState({ fields: { ...oldFields, password: value } });
        break;
      default:
        return;
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const username = this.state.fields.username;
    const password = this.state.fields.password;

    if (!username || !password) return;

    this.setState({
      isLoading: true
    });

    var obj = this;

    client.login(username, password, function(err, statusCode, user) {
      obj.setState({
        ...obj.state,
        isLoading: false
      });

      if (statusCode === 500)
        return obj.setState({ message: 'Problème de connexion' });

      if (statusCode === 400)
        return obj.setState({
          message:
            "Erreur dans la saisie du nom d'utilisateur ou du mot de passe"
        });

      var { cookies } = obj.props;

      cookies.set('user', user, { path: '/' });

      obj.setState({
        success: true
      });
    });
  }

  render() {
    if (this.state.isLoading) return <div>Loading...</div>;

    if (this.state.success) return <Redirect to="/dashboard" />;

    if (!this.state.isLoading) {
      return (
        <form style={{ border: '1px solid #ccc' }}>
          <div className="container">
            <label htmlFor="username">Nom utilisateur</label>
            <input
              name="username"
              value={this.state.fields.username}
              type="text"
              placeholder="Nom utilisateur"
              onChange={e => this.handleInputChange(e, 'username')}
            />

            <label htmlFor="psw">Mot de passe</label>
            <input
              name="psw"
              value={this.state.fields.password}
              type="password"
              placeholder="Mot de passe"
              onChange={e => this.handleInputChange(e, 'password')}
            />
            <span>{this.state.message}</span>
            <div class="clearfix">
              <button type="submit" onClick={e => this.handleFormSubmit(e)}>
                valider
              </button>
            </div>
          </div>
        </form>
      );
    }
  }
}

export default withCookies(Login);
