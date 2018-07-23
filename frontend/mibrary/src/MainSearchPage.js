import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class MainSearchPage extends Model 
{
  constructor()
  {
    super();
    this.bookModels = [];
    this.userModels = [];
    this.courseModels = [];
    this.bookSearchModels = [];
    this.userSearchModels = [];
    this.courseSearchModels = [];
  }

  getModelIdentifier(model)
  {
    for (var prop in model)
    {
        if (prop === "isbn")
        {
            return /book/ + model.isbn;
        }
        else if (prop === "course_id")
        {
            return /course/ + model.course_id;
        }
        else if(prop === "username")
        {
            return /user/ + model.username;
        }
    }
    return "";
  }

  highlightText(model, searchValue)
  {
    return (
      <div id={model.objName}>
        {Model.highlightModelText(model.objName, searchValue)}
      </div>
    );
  }

  searchCondition(queryText, model)
  {
    if(queryText.length == 0 || model.objName.toLowerCase().includes(queryText.toLowerCase()))
    {
      return true;
    }
    return false;
  }

  filterCondition(filter0, filter1, model)
  {
    return true;
  }

  Model()
  {
	  fetch(this.apiURL+'books')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.bookModels = responseJson;
        this.bookSearchModels = responseJson;
      })

      fetch(this.apiURL + 'course/institution/3658')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.courseModels = responseJson;
        this.courseSearchModels = responseJson;
      })

      fetch(this.apiURL+'users')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.userModels = responseJson;
        this.userSearchModels = responseJson;
      })
      let newModels = this.bookModels.concat(this.courseModels, this.userModels);
      let newSearchModels = this.bookSearchModels.concat(this.courseSearchModels, this.userSearchModels);
      this.setState({models : newModels});
      this.setState({searchModels : newSearchModels});
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount} = this.state;

    let bookModelsList = this.bookModels.map((res) => {
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
        publishes : res.publisher,
        subject : res.subjects,
        subtitle : res.subtitle,
        url: res.url
      });
    });

    
    let courseModelsList = this.courseModels.map((res) => {
        var content = (
          <div id={res.course_id}>
            {res.course_name}
          </div>
        );
        return({
          objName : res.course_name,
          content : content,
          course_name : res.course_name,
          course_id: res.course_id,
          department : res.department,
          course_number : res.course_number
        });
      });

     let userModelsList = this.userModels.map((res) => {
        var content = (
          <div id={res.user_id}>
            {res.username}
          </div>
        );
        return({
          objName : res.username,
          content : content,
          username : res.username,
          user_id : res.user_id
        });
      });
  

    let bookSearchModelsList = this.bookSearchModels.map((res) => {
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

        
    let courseSearchModelsList = this.courseSearchModels.map((res) => {
        var content = (
          <div id={res.course_id}>
            {res.course_name}
          </div>
        );
        return({
          objName : res.course_name,
          content : content,
          course_name : res.course_name,
          course_id: res.course_id,
          department : res.department,
          course_number : res.course_number
        });
      });

      let userSearchModelsList = this.userSearchModels.map((res) => {
        var content = (
          <div id={res.user_id}>
            {res.username}
          </div>
        );
        return({
          objName : res.username,
          content : content,
          username : res.username,
          user_id : res.user_id
        });
      });

    let modelsList = bookModelsList.concat(courseModelsList, userModelsList);
    let searchModelsList = bookSearchModelsList.concat(courseSearchModelsList, userSearchModelsList);

    return (
      <PaginatedContainer
        models={modelsList}
        searchModels={searchModelsList}
        searchValue={searchValue}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        filterOptions={[]}
        getModelIdentifier={this.getModelIdentifier}
        handleClick={this.handleClick}
        filterCondition={this.filterCondition}
        searchCondition={this.searchCondition}
        highlightModelText={this.highlightText}
        this={this}
      />
    );
  }
}

export default MainSearchPage;