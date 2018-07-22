import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer} from './MainContainer.js'

class BookDetail extends Component 
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
    const url = this.apiURL + "book/" + this.props.match.params.isbn;
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
        <h1>{model.title}</h1>
        <p>{model.isbn}</p>
        <p>{model.publisher}</p>
      </div>
    );

    return (
      <MainContainer content={content} />
    );
  }
}

export default BookDetail;