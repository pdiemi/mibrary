import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class Book extends Model 
{
  constructor()
  {
    super();
  }

  getModelIdentifier(model)
  {
    return /book/ + model.isbn;
  }

  searchCondition(queryText, model)
  {
    if(queryText.length == 0 || model.title.toLowerCase().includes(queryText.toLowerCase()))
    {
      return true;
    }
    return false;
  }

  Model()
  {
	  fetch('http://localhost:5000/api/books')
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
        <div id={res.isbn}>
          {res.title}
        </div>
      );
      return({
        title : res.title,
        content : content,
        isbn : res.isbn
      });
    });

    let searchModelsList = searchModels.map((res) => {
      var content = (
        <div id={res.isbn}>
          {res.title}
        </div>
      );
      return({
        title : res.title,
        content : content,
        isbn : res.isbn
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

export default Book;