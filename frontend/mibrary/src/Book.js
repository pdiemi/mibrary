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
    return "book/"+model.id;
  }

  Model()
  {
	  fetch('http://localhost:5000/books')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({models : responseJson});
      })
  }

  render()
  {
    const { models, isbns, currentPage, pageModelCount} = this.state;
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

export default Book;