import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class User extends Model 
{
  constructor()
  {
    super();
  }

  getModelIdentifier(index)
  {
    return "userdetail";
  }

  Model()
  {
    fetch('http://localhost:5000/users')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        let models = responseJson.map((res) => {
          return (
              <div key="{res.results}">
                {res.username}
              </div>
            );
        })
        this.setState({models : models});
      })
  }

  render()
  {
    const { models, currentPage, pageModelCount} = this.state;
    return (
      <PaginatedContainer
        models={models}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
      />
    );
  }
}

export default User;