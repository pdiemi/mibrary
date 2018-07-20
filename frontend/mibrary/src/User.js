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
    return /user/ + model.username;
  }

  searchCondition(queryText, model)
  {
    if(queryText.length == 0 || model.username.toLowerCase().includes(queryText.toLowerCase()))
    {
      return true;
    }
    return false;
  }

  Model()
  {
    fetch('http://localhost:5000/api/users')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {

        this.setState({models : responseJson});
        this.setState({searchModels : responseJson});
      })
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount} = this.state;

    let modelsList = models.map((res) => {
      var content = (
        <div id={res.user_id}>
          {res.username}
        </div>
      );
      return({
        content : content,
        username : res.username,
        user_id : res.user_id
      });
    });

    let searchModelsList = searchModels.map((res) => {
      var content = (
        <div id={res.user_id}>
          {res.username}
        </div>
      );
      return({
        content : content,
        username : res.username,
        user_id : res.user_id
      });
    });

    return (
      <PaginatedContainer
        models={modelsList}
        searchModels={searchModelsList}
        searchValue={searchValue}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        searchCondition={this.searchCondition}
        this={this}
      />
    );
  }
}

export default User;