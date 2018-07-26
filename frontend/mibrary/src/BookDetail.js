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
        model : [],
        reviews: [],
        offeringUsers: [],
        requestingUsers: []
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

      const urlReviews = apiURL + "reviews/" + this.props.match.params.isbn;
      fetch(urlReviews)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({reviews : responseJson});
      })

      const urlOfferingUsers = apiURL + "offered-book/" + this.props.match.params.isbn;
      fetch(urlOfferingUsers)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({offeringUsers : responseJson});
      })

      const urlRequestingUsers = apiURL + "requested-book/" + this.props.match.params.isbn;
      fetch(urlRequestingUsers)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({requestingUsers : responseJson});
      })
  }


  render() 
  {
    const { model, reviews, offeringUsers, requestingUsers } = this.state;

    let reviewsList = reviews.map((res) => {
      return({
        date : res.date,
        username: res.username,
        content : res.content,
      });
    });
    const renderReviews = reviewsList.map((model) => {
      return (
        <div id={model.username}>
        <b>{model.username} {model.date}</b><br/>
        <p>{model.content}</p>
        </div>
      );
    });

    let offeringList = offeringUsers.map((res) => {
      return({
        username: res.username,
      });
    });
    const renderOffering = offeringList.map((model, index) => {
      const link =  /user/ + model.userName;
      return <a href={link}> <p key={index}>{model.userName}</p></a>;
    });

    let requestingList = requestingUsers.map((res) => {
      return({
        username: res.username,
      });
    });
    const renderRequesting = requestingList.map((model, index) => {
      const link =  /user/ + model.userName;
      return <a href={link}> <p key={index}>{model.userName}</p></a>;
    });

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
      <div className="card">
      <h5>Reviews:</h5>
        {renderReviews}
      </div>
      <div className="card">
      <h5>Users Requesting <i>{model.title}</i>:</h5>
        {renderRequesting}
      </div>
      <div className="card">
      <h5>Users Offering <i>{model.title}</i>:</h5>
        {renderOffering}
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