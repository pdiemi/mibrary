import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

class AddUser extends Component 
{
  constructor()
  {
    super();
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
  }


  render() 
  {
    let content = (
      <div>Add a user?</div>
    );
    return (
      <MainContainer content={content} />
    );
  }
}

export default AddUser;