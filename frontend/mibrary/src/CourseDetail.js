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

    const twitterShareLink = "https://twitter.com/share?url=http://www.mibrary.me/course/" + model.course_id + "&text=Look at this course!";
    const fbShareLink = "https://facebook.com/sharer/sharer.php?u=http://www.mibrary.me/course/" + model.course_id + "&t=Look at this course!";

    var content = (
      <div name="page">
      <div className="card">
        <h1>{model.course_name}</h1>
        <p>{model.department} {model.course_number}</p>
      </div>
        <br/>
        <div className="card" id="ShareButton" >
          <p>Share:</p>
          <a href={twitterShareLink} target="_blank"><img height="50" width="50" src="/images/icons/twitter_share.png"></img></a>
          <a href={fbShareLink} target="_blank"><img height="50" width="50" src="/images/icons/fb_share.png"></img></a>
        </div>
      </div>
    );

    return (
      <MainContainer content={content} />
    );
  }
}

export default CourseDetail;