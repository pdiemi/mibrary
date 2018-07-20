import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class Course extends Model 
{
  constructor()
  {
    super();
  }

  getModelIdentifier(model)
  {
    return /course/ + model.course_id;
  }

  searchCondition(queryText, model)
  {
    if(queryText.length == 0 || model.course_name.toLowerCase().includes(queryText.toLowerCase()))
    {
      return true;
    }
    return false;
  }

  Model()
  {
    fetch('http://localhost:5000/api/course/institution/3658')
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
        <div id={res.course_id}>
          {res.course_name}
        </div>
      );
      return({
        content : content,
        course_name : res.course_name,
        course_id: res.course_id,
        department : res.department,
        course_number : res.course_number
      });
    });

    let searchModelsList = searchModels.map((res) => {
      var content = (
        <div id={res.course_id}>
          {res.course_name}
        </div>
      );
      return({
        content : content,
        course_name : res.course_name,
        course_id: res.course_id,
        department : res.department,
        course_number : res.course_number
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

export default Course;