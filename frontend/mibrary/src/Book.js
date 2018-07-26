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
    let queries = Model.splitQuery(searchValue);
    var modelText = model.title;
    for(let query in queries)
    {
      let q = Model.highlightModelText(model.title, query);
      console.log(q);
      if(q != model.title)
      {
        modelText = q;
      }
    }

    return (
      <div id={model.isbn}>
        {modelText}
      </div>
    );
  }

  highlightDetailCard(model, searchValue)
  {
    const id = model.isbn + "-card";

    return (
      <div id={id}>
        ISBN: {Model.highlightModelText(model.isbn, searchValue)}<br/>
        Subject: {Model.highlightModelText(model.subject, searchValue)}<br/>
        Authors: {Model.highlightModelText(model.authors, searchValue)}<br/>
        Publisher: {Model.highlightModelText(model.publisher, searchValue)}
      </div>
    );
  }

  searchCondition(queryText, model)
  {
    const queries = Model.splitQuery(queryText);

    const searchWord = function(queryText, model)
      {
        return queryText.length == 0 | model.title.toLowerCase().includes(queryText)
          | model.isbn == queryText
          | model.authors.toLowerCase().includes(queryText)
          | model.publisher.toLowerCase().includes(queryText)
          | model.subject.toLowerCase().includes(queryText);
      }

    for(let query of queries)
    {
      if(searchWord(query, model)) {return true;}
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

  PriorityCompare(queryText, a, b)
  {
    if(queryText.length == 0)
    {
      return 0;
    }
    const queries = Model.splitQuery(queryText);
    const getVal = function(queryText, a, b)
    {
      const aTitleIndex = a.title.toLowerCase().indexOf(queryText);
      const bTitleIndex = b.title.toLowerCase().indexOf(queryText);
      const aAuthorIndex = a.authors.toLowerCase().indexOf(queryText);
      const bAuthorIndex = b.authors.toLowerCase().indexOf(queryText);
      const aPubIndex = a.publisher.toLowerCase().indexOf(queryText);
      const bPubIndex = b.publisher.toLowerCase().indexOf(queryText);
      if(aTitleIndex == 0) {
        return -2;
      } else if(bTitleIndex == 0) {
        return 2;
      } else if (a.isbn == queryText) {
        return -5;
      } else if (b.isbn == queryText) {
        return 5;
      } else if (aTitleIndex > 1 && a.title[aTitleIndex - 1] == ' ') {
        return -2;
      } else if (bTitleIndex > 1 && b.title[bTitleIndex - 1] == ' ') {
        return 2;
      } else if (aAuthorIndex == 0 | aAuthorIndex > 1 && a.authors[aAuthorIndex - 1] == ' ') {
        return -2;
      } else if (bAuthorIndex == 0 | bAuthorIndex > 1 && b.authors[bAuthorIndex - 1] == ' ') {
        return 2;
      } else if (aPubIndex == 0 | aPubIndex > 1 && a.publisher[aPubIndex - 1] == ' ') {
        return -2;
      } else if (bPubIndex == 0 | bPubIndex > 1 && b.publisher[bPubIndex - 1] == ' ') {
        return 2;
      } else if (aTitleIndex > 0) {
        return -1;
      } else if (bTitleIndex > 0) {
        return 1;
      } else {
        return 0;
      }
    }
    var sum = 0;
    for(let query of queries)
    {
      sum += query.length*1.5*getVal(query, a, b);
    }
    return sum;
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
        PriorityCompare={this.PriorityCompare}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        filterOptions={filterOptions}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        filterCondition={this.filterCondition}
        searchCondition={this.searchCondition}
        highlightModelText={this.highlightBookText}
        highlightDetailCard={this.highlightDetailCard}
        this={this}
      />
    );
  }
}

export default Book;