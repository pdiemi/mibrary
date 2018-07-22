import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import {MainContainer} from './MainContainer.js'
import MainSearchPage from './MainSearchPage.js';

class MainPage extends Component 
{

  constructor()
  {
    super();
  }

  render() 
  {
    const card = (
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
    );
    return (
      <MainContainer content = {card}/>
      //<MainSearchPage/>
    );
  }
}

export default MainPage;