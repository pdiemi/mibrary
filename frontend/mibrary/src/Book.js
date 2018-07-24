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

  highlightBookText(model, searchValue)
  {
    return (
      <div id={model.isbn}>
        {Model.highlightModelText(model.title, searchValue)}
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

  filterCondition(filter0, filter1, model)
  {
    if((filter0.length == 0 || model.subject.toLowerCase().includes(filter0.toLowerCase())) && (filter1.length == 0 || model.authors.toLowerCase().includes(filter1.toLowerCase())))
    {
      return true;
    }
    return false;
  }

  Model()
  {
    console.log(this.apiURL+'books');
	  fetch(this.apiURL+'books')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({models : responseJson});
        this.setState({searchModels : responseJson});
      })

      this.setState({filterOptions : ["Subject", "Authors"]});
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount, filterOptions} = this.state;

    let modelsList = models.map((res) => 
    {
      var content = (
        <div id={res.isbn}>
          {res.title}
        </div>
      );
      return({
        objName : res.title,
        title : res.title,
        content : content,
        isbn : res.isbn,
        authors : res.authors,
        pages: res.pages,
        publisher : res.publisher,
        subject : res.subjects,
        subtitle : res.subtitle,
        url: res.url
      });
    });

    let searchModelsList = searchModels.map((res) => {
      var content = (
        <div className="card" id={res.isbn}>
          {res.title}
        </div>
      );
      return({
        objName : res.title,
        title : res.title,
        content : content,
        isbn : res.isbn,
        authors : res.authors,
        pages: res.pages,
        publisher : res.publisher,
        subject : res.subjects,
        subtitle : res.subtitle,
        url: res.url
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
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        filterCondition={this.filterCondition}
        searchCondition={this.searchCondition}
        highlightModelText={this.highlightBookText}
        this={this}
      />
    );
  }
}

export default Book;