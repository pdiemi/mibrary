import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';

class User extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        models : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"],
        currentPage : 1,
        pageModelCount : 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
      var listModelsJson = JSON.parse("{ \"books\" : [\"one\", \"two\", \"three\", \"four\", \"five\", \"six\", \"seven\", \"eight\", \"nine\", \"ten\", \"eleven\"] }");
      var newModels = []
      for(var i = 0; i<listModelsJson.books.length; i++){
        newModels[i] = listModelsJson.books[i];
      }
      this.setState({
          models : newModels
      });
  }

  handleClick(event)
  {
    this.setState({
      currentPage : Number(event.target.id)
    });
  }

  render() 
  {
    const { models, currentPage, pageModelCount} = this.state;

    const indexOfLast = currentPage * pageModelCount;
    const indexOfFirst = indexOfLast - pageModelCount;
    const currentDisplayModels = models.slice(indexOfFirst, indexOfLast);

    const renderModels = currentDisplayModels.map((model, index) => {
      const link = model + ".html"; 
      return <a href={link}> <p key={index}>{model}</p></a>;});

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(models.length/pageModelCount); i++)
    {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => 
    {
        return (<a href="#"><li key={number} id={number} onClick={this.handleClick}>{number}</li></a>);
    });

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
                    <Link to='/book'>Books</Link>
                    <Link to='/course'>Courses</Link>
                    <Link to='/user'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </div>
        </header>
        <div>
            {renderModels}
          <ul id="pageNumbers">
            {renderPageNumbers}
          </ul>
        </div>
      </div>
    );
  }
}

export default User;