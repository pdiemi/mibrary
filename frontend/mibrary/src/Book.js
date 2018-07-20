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

  Model()
  {
	  fetch('http://localhost:5000/api/books')
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
        <div id={res.isbn}>
          {res.title}
        </div>
      );
      return({
        content : content,
        isbn : res.isbn
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

export default Book;