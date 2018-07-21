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

  highlightModelText(model, searchValue)
  {
    var title = model.title;
    var n = model.title.toLowerCase().indexOf(searchValue.toLowerCase());
    if(searchValue.length < 1 | n < 0) {
      return (
        <div id={model.isbn}>
          {model.title}
        </div>
      );
    }
    console.log(n);
    var titleString = [];
    titleString[0] = model.title.substring(0, n);
    titleString[1] = model.title.substring(n, n+searchValue.length);
    titleString[2] = model.title.substring(n+searchValue.length);
    console.log("------");
    console.log(titleString[0]);
    console.log(titleString[1]);
    console.log(titleString[2]);
    return (
      <div id={model.isbn}>
        {titleString[0]}<b>{titleString[1]}</b>{titleString[2]}
      </div>
      );
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
      var title = res.title;
      const searchValue = this.state.searchValue;
      var n = res.title.indexOf(searchValue);
      var titleString = [];
      titleString[0] = res.title.substring(0, n);
      titleString[1] = res.title.substring(n, searchValue.length);
      titleString[2] = res.title.substring(n+searchValue.length);
      var content = (
        <div id={res.isbn}>
          {titleString[0]}<b>{titleString[1]}</b>{titleString[2]}
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
        highlightModelText={this.highlightModelText}
        this={this}
      />
    );
  }
}

export default Book;