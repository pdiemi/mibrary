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
    const queries = Model.splitQuery(queryText);

    const searchWord = function(queryText, model)
      {
        return queryText.length == 0 | model.username.toLowerCase().includes(queryText)
          | model.major.toLowerCase().includes(queryText);
      }

    for(let query of queries)
    {
      if(searchWord(query, model)) {return true;}
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

  highlightDetailCard(model, searchValue)
  {
    const id = model.user_id + "-card";

    return (
      <div id={id}>
        Major: {Model.highlightModelText(model.major, searchValue)}
      </div>
    );
  }

  PriorityCompare(queryText, a, b)
  {
    if(queryText.length == 0)
    {
      return 0;
    }

    queryText = queryText.toLowerCase();
    const aTitleIndex = a.username.toLowerCase().indexOf(queryText);
    const bTitleIndex = b.username.toLowerCase().indexOf(queryText);
    if(aTitleIndex == 0) {
      return -1;
    } else if(bTitleIndex == 0) {
      return 1;
    } else if (aTitleIndex > 1 && a.username[aTitleIndex - 1] == ' ') {
      return -1;
    } else if (bTitleIndex > 1 && b.username[bTitleIndex - 1] == ' ') {
      return 1;
    } else if (aTitleIndex > 0) {
      return -1;
    } else if (bTitleIndex > 0) {
      return 1;
    } else {
      return 0;
    }
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
        PriorityCompare={this.PriorityCompare}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        filterOptions={filterOptions}
        filterCondition={this.filterCondition}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        searchCondition={this.searchCondition}
        highlightModelText={this.highlightUserText}
        highlightDetailCard={this.highlightDetailCard}
        this={this}
      />
    );
  }
}

export default User;