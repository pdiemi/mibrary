import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';

class Model extends Component 
{
  constructor()
  {
    super();
  }

  render() 
  {
    
    return (
      <div className="App">
        <header>
        <div class="container ">
            <div class="header">
                <a target="blank" href="index.html">
                    <img src="images/logos/logo7.png " class="img-responsive " alt="logo7 "></img>
                </a>
                <div class="topnav ">
                    <Link to='/'>Home</Link>
                    <Link to='/model'>Books</Link>
                    <Link to='/model'>Courses</Link>
                    <Link to='/model'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </div>
        </header>
      </div>
    );
  }
}

export default Model;