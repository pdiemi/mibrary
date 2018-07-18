import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './Model.css';
import {Navbar} from './Navbar.js';

class Book extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        models : [],
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
  	  fetch('http://localhost:3000/json/test_book_list.json')
        .then((response) => {
          return response.json()})
        .then((responseJson) => {
          let models = responseJson.results.map((res) => {
            return (
                <div key="{res.results}">
                  {res.title}
                </div>
              )//
          })
          this.setState({models : models});
          // console.log("state", this.state.models);
        })
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
      return <Link to='/bookdetail'><p key={index}>{model}</p></Link>;});

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
        <Navbar/>
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

export default Book;