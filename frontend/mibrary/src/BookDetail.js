import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

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
    const url = apiURL + "book/" + this.props.match.params.isbn;
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

    const twitterShareLink = "https://twitter.com/share?url=http://www.mibrary.me/book/" + model.isbn + "&text=Look at this textbook!";
    const fbShareLink = "https://facebook.com/sharer/sharer.php?u=http://www.mibrary.me/book/" + model.isbn + "&t=Look at this textbook!";

    var content = (
    <div name="page">
      <div className="card">
        <h1>{model.title}</h1>
        <p>{model.subtitle}</p>
        <p>Subject: {model.subject}</p>
        <p>Authors: {model.authors}</p>
        <p>ISBN: {model.isbn}</p>
        <p>Publisher: {model.publisher}</p>
        <p>Pages: {model.pages}</p>
        <p>External URL: {model.url}</p>
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

export default BookDetail;