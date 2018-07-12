import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './MainPage.css';

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
                <a target="blank" href="index.html">
                    <img src="images/logos/logo7.png " class="img-responsive " alt="logo7 "></img>
                </a>
                <div class="topnav ">
                    <Link to='/'>Home</Link>
                    <Link to='/book'>Books</Link>
                    <Link to='/course'>Courses</Link>
                    <Link to='/user'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
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