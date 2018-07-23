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

  filterCondition(filter0, filter1, model)
  {
    if((filter0.length == 0 || model.email.toLowerCase().includes(filter0.toLowerCase())) && (filter1.length == 0 || model.major.toLowerCase().includes(filter1.toLowerCase())))
    {
      return true;
    }
    return false;
  }

  highlightUserText(model, searchValue)
  {
    return (
      <div id={model.user_id}>
        {Model.highlightModelText(model.username, searchValue)}
      </div>
    );
  }

  Model()
  {
    fetch(this.apiURL+'users')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({models : responseJson});
        this.setState({searchModels : responseJson});
      })

      this.setState({filterOptions : ["Email", "Major"]});
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount, filterOptions} = this.state;

    let modelsList = models.map((res) => {
      var content = (
        <div id={res.user_id}>
          {res.username}
        </div>
      );
      return({
        objName : res.username,
        content : content,
        username : res.username,
        user_id : res.user_id,
        email : res.email,
        major : res.major
      });
    });

    let searchModelsList = searchModels.map((res) => {
      var content = (
        <div id={res.user_id}>
          {res.username}
        </div>
      );
      return({
        objName : res.username,
        content : content,
        username : res.username,
        user_id : res.user_id,
        email : res.email,
        major : res.major
      });
    });

    return (
      <PaginatedContainer
        models={modelsList}
        searchModels={searchModelsList}
        searchValue={searchValue}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        filterOptions={filterOptions}
        filterCondition={this.filterCondition}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        searchCondition={this.searchCondition}
        highlightModelText={this.highlightUserText}
        this={this}
      />
    );
  }
}

export default User;