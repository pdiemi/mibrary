import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
        models : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"],
        currentPage : 1,
        pageModelCount : 10
    };
    this.handleClick = this.handleClick.bind(this);
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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

export default App;