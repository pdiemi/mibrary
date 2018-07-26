import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

class UserDetail extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        model : [],
        reviews: [],
        offeredBooks: [],
        requestedBooks: [],
    };
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = apiURL + "user/" + this.props.match.params.user_id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({model : responseJson});
      })

      const urlReviews = apiURL + "reviews/" + this.props.match.params.username;
      fetch(urlReviews)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {})
      .then((responseJson) => {
        this.setState({reviews : responseJson});
      })

      const urlOfferingUsers = apiURL + "offered-book/" + this.props.match.params.username;
      fetch(urlOfferingUsers)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {})
      .then((responseJson) => {
        this.setState({offeredBooks : responseJson});
      })

      const urlRequestingUsers = apiURL + "requested-book/" + this.props.match.params.username;
      fetch(urlRequestingUsers)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {})
      .then((responseJson) => {
        this.setState({requestedBooks : responseJson});
      })
  }


  render() 
  {
    const { model, reviews, offeredBooks, requestedBooks } = this.state;

    var renderReviews = [];
    var renderOffering = [];
    var renderRequesting = [];

    if(reviews != null) {
      let reviewsList = reviews.map((res) => {
        return({
          date : res.date,
          content : res.content,
        });
      });
      renderReviews = reviewsList.map((model) => {
        return (
          <div id={model.username}>
          <b>{model.date}</b><br/>
          <p>{model.content}</p>
          </div>
        );
      });
    }

    if(offeredBooks != null) {
      let offeringList = offeredBooks.map((res) => {
        return({
          isbn: res.book_id,
        });
      });
      renderOffering = offeringList.map((model, index) => {
        const link =  /book/ + model.isbn;
        return <a href={link}> <p key={index}>{model.isbn}</p></a>;
      });
    }

    if(requestedBooks != null) {
      let requestingList = requestedBooks.map((res) => {
        return({
          isbn: res.book_id,
        });
      });
      renderRequesting = requestingList.map((model, index) => {
        const link =  /book/ + model.isbn;
        return <a href={link}> <p key={index}>{model.isbn}</p></a>;
      });
    }

    var content = (
      <div name="page">
        <div className="card">
          <h1>{model.username}</h1>
          <p>E-mail: {model.email}</p>
          <p>Major: {model.major}</p>
          <center><img width="160" height="200" src="/images/LucyLiu.png"></img></center>
        </div>
        <div className="card">
        <h5>Reviews:</h5>
          {renderReviews}
        </div>
        <div className="card">
        <h5>Books Requesting:</h5>
          {renderRequesting}
        </div>
        <div className="card">
        <h5>Books Offering:</h5>
          {renderOffering}
        </div>
      </div>
    );

    return (
      <MainContainer content={content} />
    );
  }
}

export default UserDetail;