import React, { Component } from 'react';
import Client from '../../Client';

class AddDepo extends Component {
  state = {
    fields: {
      quartier: '',
      ville: '',
      departement: '',
      categorie: '',
      description: '',
      date: '',
      m: false,
      f: false,
      ageAuteur: '',
      temoignage: ''
    },
    person: {
      nom: '',
      prenom: '',
      addresse: '',
      numero: ''
    },
    personId: '',
    personSelected: false,
    isLoading: false
  };

  handleInputChange(e, field) {
    var oldFields = { ...this.state.fields };
    var oldPerson = { ...this.state.person };
    const value = e.target.value;
    console.log(value);

    switch (field) {
      case 'quartier':
        this.setState({ fields: { ...oldFields, quartier: value } });
        break;
      case 'ville':
        this.setState({ fields: { ...oldFields, ville: value } });
        break;
      case 'departement':
        this.setState({ fields: { ...oldFields, departement: value } });
        break;
      case 'categorie':
        this.setState({ fields: { ...oldFields, categorie: value } });
        break;
      case 'description':
        this.setState({ fields: { ...oldFields, description: value } });
        break;
      case 'date':
        this.setState({ fields: { ...oldFields, date: value } });
        break;
      case 'm':
        this.setState({
          fields: { ...oldFields, m: e.target.checked, f: false }
        });
        break;
      case 'f':
        this.setState({
          fields: { ...oldFields, f: e.target.checked, m: false }
        });
        break;
      case 'ageAuteur':
        this.setState({ fields: { ...oldFields, ageAuteur: value } });
        break;
      case 'temoignage':
        this.setState({
          fields: { ...oldFields, temoignage: e.target.checked }
        });
        break;
      case 'nom':
        this.setState({
          person: { ...oldPerson, nom: value }
        });
        break;
      case 'prenom':
        this.setState({
          person: { ...oldPerson, prenom: value }
        });
        break;
      case 'numero':
        this.setState({
          person: { ...oldPerson, numero: value }
        });
        break;
      case 'addresse':
        this.setState({
          person: { ...oldPerson, addresse: value }
        });
        break;
      default:
        return;
    }
  }

  handlePersonFormSubmit(e) {
    e.preventDefault()
    var classRef = this;
    var reset = {
      nom: '',
      prenom: '',
      addresse: '',
      numero: ''
    };
    classRef.setState({ isLoading: true });
    Client.newPerson(this.state.person, function(err, statusCode, body) {
      if (!(statusCode === 200)) return classRef.setState({ isLoading: false });
      var id = JSON.parse(body).id;
      classRef.setState({
        isLoading: false,
        person: reset,
        personSelected: true,
        personId: id
      });
    });
  }

  handleDepoFormSubmit(e){
    e.preventDefault();
    var classRef = this;
    var reset = {
      quartier: '',
      ville: '',
      departement: '',
      categorie: '',
      description: '',
      date: '',
      m: false,
      f: false,
      ageAuteur: '',
      temoignage: ''
    }
    Client.newDepo(this.state.personId, this.state.fields, function(err, statusCode, body){
      if(!(statusCode)) return classRef.setState({ isLoading: false });
      classRef.setState({
        isLoading: false,
        person: reset,
        personSelected: false,
        personId: ''
      });

      alert('Déposition bien enregistrer');
    });
  }

  render() {
    var depositionForm = (
      <form style={{ border: '3px solid #ccc' }}>
        <div className="container">
          <label htmlFor="quartier">Quatier</label>
          <input
            value={this.state.fields.quartier}
            onChange={e => this.handleInputChange(e, 'quartier')}
            name="quartier"
            type="text"
            placeholder="Quartier"
            autoComplete="off"
          />

          <label htmlFor="ville">Ville</label>
          <input
            value={this.state.fields.ville}
            onChange={e => this.handleInputChange(e, 'ville')}
            name="ville"
            type="text"
            placeholder="Ville"
            autoComplete="off"
          />
          <label htmlFor="departement">Département</label>
          <input
            value={this.state.fields.departement}
            onChange={e => this.handleInputChange(e, 'departement')}
            name="departement"
            type="text"
            placeholder="Département"
            autoComplete="off"
          />
          <label htmlFor="categorie">Catégorie</label>
          <input
            value={this.state.fields.categorie}
            onChange={e => this.handleInputChange(e, 'categorie')}
            name="categorie"
            type="text"
            placeholder="Catégorie"
            autoComplete="off"
          />

          <label htmlFor="categorie">Description</label>
          <textarea
            onChange={e => this.handleInputChange(e, 'description')}
            value={this.state.fields.description}
            placeholder="Description"
            type="text"
          />

          <label>Date</label>
          <input
            onChange={e => this.handleInputChange(e, 'date')}
            value={this.state.fields.date}
            type="date"
          />

          <label>Sexe de l'auteur</label>
          <label className="container-radio">
            M
            <input
              onChange={e => this.handleInputChange(e, 'm')}
              checked={this.state.fields.m}
              type="radio"
              name="radioM"
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            F
            <input
              onChange={e => this.handleInputChange(e, 'f')}
              checked={this.state.fields.f}
              type="radio"
              name="radioF"
            />
            <span className="checkmark" />
          </label>

          <label>Age de l'auteur</label>
          <input
            onChange={e => this.handleInputChange(e, 'ageAuteur')}
            value={this.state.fields.ageAuteur}
            placeholder="Âge de l'auteur"
            type="number"
          />

          <label className="container-radio">
            Témoignage
            <input
              onChange={e => this.handleInputChange(e, 'temoignage')}
              checked={this.state.fields.temoignage}
              type="checkbox"
            />
            <span className="check" />
          </label>

          <div className="clearfix">
            <button
              onClick={e => {
                this.handleDepoFormSubmit(e);
              }}
              type="submit"
            >
              valider
            </button>
          </div>
        </div>
      </form>
    );

    var personForm = (
      <form style={{ border: '3px solid #ccc' }}>
        <div className="container">
          <label htmlFor="nom">Nom</label>
          <input
            name="nom"
            value={this.state.person.username}
            type="text"
            placeholder="Nom"
            onChange={e => this.handleInputChange(e, 'nom')}
          />

          <label htmlFor="prenom">Prénom</label>
          <input
            name="prenom"
            value={this.state.person.prenom}
            type="text"
            placeholder="Prénom"
            onChange={e => this.handleInputChange(e, 'prenom')}
          />
          <label htmlFor="prenom">Numéro</label>
          <input
            name="prenom"
            value={this.state.person.numero}
            type="number"
            placeholder="Numéro"
            onChange={e => this.handleInputChange(e, 'numero')}
          />
          <label>Addresse</label>
          <input
            value={this.state.person.addresse}
            type="text"
            placeholder="Addresse"
            onChange={e => this.handleInputChange(e, 'addresse')}
          />
          <span>{this.state.message}</span>
          <div className="clearfix">
            <button type="submit" onClick={e => this.handlePersonFormSubmit(e)}>
              valider
            </button>
          </div>
        </div>
      </form>
    );
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }
    return this.state.personSelected ? depositionForm : personForm;
  }
}

export default AddDepo;
