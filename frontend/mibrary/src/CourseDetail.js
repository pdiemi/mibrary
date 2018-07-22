import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer} from './MainContainer.js'

class CourseDetail extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        model : []
    };
    this.apiURL = "http://ec2-18-191-216-158.us-east-2.compute.amazonaws.com:5000/api/";
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = this.apiURL + "course/" + this.props.match.params.course_id;
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