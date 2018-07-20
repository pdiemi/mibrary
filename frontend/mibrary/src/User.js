import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class User extends Model 
{
  constructor()
  {
    super();
  }

  getModelIdentifier(model)
  {
    return model.username;
  }

  Model()
  {
    fetch('http://localhost:5000/users')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {

        this.setState({models : responseJson});
      })
  }

  render()
  {
    const { models, currentPage, pageModelCount} = this.state;

    let modelsList = models.map((res) => {
      var content = (
        <div id={res.username}>
          {res.username}
        </div>
      );
      return({
        content : content,
        username : res.username
      });
    });

    return (
      <PaginatedContainer
        models={modelsList}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
      />
    );
  }
}

export default User;