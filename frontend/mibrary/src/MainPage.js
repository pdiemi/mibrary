import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './MainPage.css';
import {Navbar} from './Navbar.js'

class MainPage extends Component 
{

  constructor()
  {
    super();
  }

  render() 
  {
     return (
      <div className="App">
        <div class="container ">
            <div class="header">
                <Navbar />
            </div>
        </div>
        <div class="clearfix"></div>

        <div class="container">
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
        </div>
        <div class="clearfix"></div>

        <div class="container">
            <div class="footer">Copyright &copy; 2018 SWE-IDB5-SUMMER2018</div>
        </div>

      </div>
    );
  }
}

export default MainPage;