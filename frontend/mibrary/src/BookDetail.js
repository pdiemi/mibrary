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
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = "http://localhost:5000/api/book/" + this.props.match.params.isbn;
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