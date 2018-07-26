import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {PaginatedContainer, Model} from './Model.js';

class MainSearchPage extends Model 
{
  constructor()
  {
    super();
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

  PriorityCompare(queryText, a, b)
  {
    if(queryText.length == 0)
    {
      return 0;
    }

    queryText = queryText.toLowerCase();
    const aTitleIndex = a.objName.toLowerCase().indexOf(queryText);
    const bTitleIndex = b.objName.toLowerCase().indexOf(queryText);
    if(aTitleIndex == 0) {
      return -1;
    } else if(bTitleIndex == 0) {
      return 1;
    } else if (aTitleIndex > 1 && a.objName[aTitleIndex - 1] == ' ') {
      return -1;
    } else if (bTitleIndex > 1 && b.objName[bTitleIndex - 1] == ' ') {
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
	  fetch(this.apiURL+'books')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({models : responseJson});
        this.setState({searchModels : responseJson});
        
          fetch(this.apiURL + 'course/institution/3658')
          .then((response) => {
            return response.json();
          })
          .then((responseJson) => {
            this.setState({models : this.state.models.concat(responseJson)});
            this.setState({searchModels : this.state.searchModels.concat(responseJson)});

              fetch(this.apiURL+'users')
              .then((response) => {
                return response.json();
              })
              .then((responseJson) => {
                this.setState({models : this.state.models.concat(responseJson)});
                this.setState({searchModels : this.state.searchModels.concat(responseJson)});
                //alert(this.state.searchModels[60]['title']);
                //alert(this.state.searchModels[61]['course_name']);
                //alert(this.state.searchModels[147]['username']);
              })
          })
      });
  }

  render()
  {
    const { models, searchValue, searchModels, currentPage, pageModelCount} = this.state;

    let modelsList = models.map((res) => 
    {
      if(res.hasOwnProperty('isbn'))
      {
        var content = (
          <div id={res.title}>
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
      }
      else if (res.hasOwnProperty('username'))
      {
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
      }
      else if (res.hasOwnProperty('course_name'))
      {
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
      }
      return({});
    });
  

    let searchModelsList = searchModels.map((res) => {
      if(res.hasOwnProperty('isbn'))
      {
        var content = (
          <div id={res.title}>
            {res.title}
          </div>
        );
        return({
          objName : "Book: " + res.title,
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
      }
      else if (res.hasOwnProperty('username'))
      {
        var content = (
          <div id={res.user_id}>
            {res.username}
          </div>
        );
        return({
          objName : "User: " + res.username,
          content : content,
          username : res.username,
          user_id : res.user_id,
          email : res.email,
          major : res.major
        });
      }
      else if (res.hasOwnProperty('course_name'))
      {
        var content = (
          <div id={res.course_id}>
            {res.course_name}
          </div>
        );
        return({
          objName : "Course: " + res.course_name,
          content : content,
          course_name : res.course_name,
          course_id: res.course_id,
          department : res.department,
          course_number : res.course_number
        });
      }
      return({});
    });

    const card = (
      <div class="card">
              <a target="blank" href="index.html">
                <img class="card-img" src="images/covers/cover1.jpg" alt="Card image"></img>
                </a>
                <div class="card-img-overlay">
                    <h1 class="card-title">Choose one,
                        <br />and go!
                    </h1>
                </div>
        </div>
    );

    return (
      <PaginatedContainer
        models={modelsList}
        searchModels={searchModelsList}
        searchValue={searchValue}
        PriorityCompare={this.PriorityCompare}
        currentPage={currentPage}
        modelsPerPage={pageModelCount}
        filterOptions={[]}
        extraContent={card}
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