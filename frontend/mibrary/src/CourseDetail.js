import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

class CourseDetail extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        model : []
    };
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = apiURL + "course/" + this.props.match.params.course_id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({model : responseJson});
      })
  }


  render() 
  {
    const { model } = this.state;

    var content = (
      <div className="card">
        <h1>{model.course_name}</h1>
        <p>{model.department} {model.course_number}</p>
      </div>
    );

    return (
      <MainContainer content={content} />
    );
  }
}

export default CourseDetail;