import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

class UserDetail extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        model : []
    };
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = apiURL + "user/" + this.props.match.params.user_id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({model : responseJson});
      })
  }


  render() 
  {
    const { model } = this.state;

    var content = (
      <div className="card">
        <h1>{model.username}</h1>
        <p>{model.email}</p>
        <p>Major: {model.major}</p>
      </div>
    );

    return (
      <MainContainer content={content} />
    );
  }
}

export default UserDetail;