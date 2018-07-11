import React, { Component } from 'react';
import './MainPage.css';

class App extends Component 
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
                    <a href="index.html ">Home</a>
                    <a href="models/books.html ">Books</a>
                    <a href="models/courses.html ">Courses</a>
                    <a href="models/users.html ">Users</a>
                    <a href="about.html ">About</a>
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

export default App;