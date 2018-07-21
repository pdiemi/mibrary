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
        searchModels: [],
        searchValue: "",
        currentPage : 1,
        pageModelCount : 10
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount()
  {
        this.Model();
  }

  static highlightModelText(searchString, searchValue)
  {
    var n = searchString.toLowerCase().indexOf(searchValue.toLowerCase());
    if(searchValue.length < 1 | n < 0) {
      return searchString;
    }
    console.log(n);
    var titleString = [];
    titleString[0] = searchString.substring(0, n);
    titleString[1] = searchString.substring(n, n+searchValue.length);
    titleString[2] = searchString.substring(n+searchValue.length);
    console.log("------");
    console.log(titleString[0]);
    console.log(titleString[1]);
    console.log(titleString[2]);
    return (
      <div>
        {titleString[0]}<b>{titleString[1]}</b>{titleString[2]}
      </div>
    );
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
  const models = props.models;
  const searchModels = props.searchModels;
  var currentPage = props.currentPage;
  const pageModelCount = props.modelsPerPage;
  const searchCondition = props.searchCondition;
  const highlightModelText = props.highlightModelText;
  const pageThis = props.this;

  const indexOfLast = currentPage * pageModelCount;
  const indexOfFirst = indexOfLast - pageModelCount;

  // console.log(models);
  const currentDisplayModels = searchModels.slice(indexOfFirst, indexOfLast);

  const renderModels = currentDisplayModels.map((model, index) => {
    const link = props.getModelIdentifier(model);
    return <a href={link}> <p key={index}>{highlightModelText(model, pageThis.state.searchValue)}</p></a>;
  });

  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(searchModels.length/pageModelCount); i++)
  {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => 
  {
      return (<a href="#"><li key={number} id={number} onClick={props.handleClick}>{number}</li></a>);
  });

  const search = function () {
    let newModels = models.filter((model) => {
      return searchCondition(pageThis.state.searchValue, model);
    });
    console.log(newModels);
    pageThis.setState({searchModels : newModels});
  }

  const handleChange = function (evt) {
    pageThis.setState({searchValue : evt.target.value});
  }

  const content = (
    <div>
      <div className="input-field">
        <input id="SearchBox" type="text" value={props.searchValue} onChange={handleChange}></input>
        <input type="submit" value="Search" onClick={search}></input>
      </div>
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
