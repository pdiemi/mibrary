import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer} from './MainContainer.js'

class BookDetail extends Component 
{
  constructor()
  {
    super();
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
    const url = "http://localhost:5000/book/" + this.props.match.params.isbn;
    fetch('')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        let models = responseJson.map((res) => {
          return (
              <div key="{res.results}">
                {res.title}
              </div>
            );
        })
        this.setState({models : models});
      })
  }


  render() 
  {
    const card = (
      <div class="card">
      <h1 class="card-title">Extreme Programming Installed</h1>
      <div>
        <img class="img-fluid" src="images/books/xpinstalled.jpg"></img>
      </div>
      <br/> ISBN
      <ul>
        <li>ISBN-13: 978-0-201-70842-4</li>
        <li>ISBN-10: 0-201-70842-6</li>
      </ul>
      <br/> Authors
      <ul>
        <li>Ron Jeffries</li>
        <li>Ann Anderson</li>
        <li>Chet Hendrickson</li>
        <li>Kent Beck</li>
      </ul>
      <br/> Publisher Addison-Wesley
      <br/> Year 2001
      <br/> Edition 1st
      <br/> Being offered by
      <ul>
        <li>
          <a href="../users/user1.html">User A</a>
        </li>
      </ul>
      </div>
    );
    return (
      <MainContainer content={card} />
    );
  }
}

export default BookDetail;