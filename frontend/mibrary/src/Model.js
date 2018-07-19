import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer} from './MainContainer.js'

export class Model extends Component
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

  handleClick(event)
  {
    this.setState({
      currentPage : Number(event.target.id)
    });
  }
}

export function PaginatedContainer(props)
{
  // const models = props.models;
  var currentPage = props.currentPage;
  const pageModelCount = props.modelsPerPage;

  const indexOfLast = currentPage * pageModelCount;
  const indexOfFirst = indexOfLast - pageModelCount;

  let models = props.models.map((res) => {
    var content = (
      <div id={res.isbn}>
        {res.title}
      </div>
    );
    return({
      content : content,
      isbn : res.isbn
    });
  })

  // console.log(models);
  const currentDisplayModels = models.slice(indexOfFirst, indexOfLast);

  const renderModels = currentDisplayModels.map((model, index) => {
    // const link = props.getModelIdentifier(model);
    return <a href={model.isbn}> <p key={index}>{model.content}</p></a>;});

  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(models.length/pageModelCount); i++)
  {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => 
  {
      return (<a href="#"><li key={number} id={number} onClick={props.handleClick}>{number}</li></a>);
  });

  const content = (
    <div>
      {renderModels}
      <ul id="pageNumbers">
        {renderPageNumbers}
      </ul>
    </div>
  );

  return (
    <MainContainer content={content} />
  );
}
