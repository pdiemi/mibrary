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

  filterCondition(filter0, filter1, model)
  {
    if((filter0.length == 0 || model.department.toLowerCase().includes(filter0.toLowerCase())) && (filter1.length == 0 || model.course_number.toLowerCase().includes(filter1.toLowerCase())))
    {
      return true;
    }
    return false;
  }

  highlightCourseText(model, searchValue)
  {
    return (
      <div id={model.course_id}>
        {Model.highlightModelText(model.course_name, searchValue)}
      </div>
    );
  }

  Model()
  {
    fetch(this.apiURL + 'course/institution/3658')
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      this.setState({models : responseJson});
      this.setState({searchModels : responseJson});
    })

    this.setState({filterOptions : ["Department", "Course Number"]});
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount, filterOptions} = this.state;

    let modelsList = models.map((res) => {
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

    let searchModelsList = searchModels.map((res) => {
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
        highlightModelText={this.highlightCourseText}
        this={this}
      />
    );
  }
}

export default Course;