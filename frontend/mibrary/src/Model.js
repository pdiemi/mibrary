import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';
import {MainContainer, apiURL} from './MainContainer.js'

export class Model extends Component
{
  constructor()
  {
    super();
    this.state = 
    {
        models : [],
        searchModels: [],
        filterOptions : [],
        searchValue: "",
        currentPage : 1,
        pageModelCount : 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.apiURL = apiURL;
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
  const filterCondition = props.filterCondition;
  const filterOptions = props.filterOptions;

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

  const GetSortMode = function()
  {
    const query = document.querySelector('input[name=sortOrder]:checked')
    var sortMode = "";
    if(query !== null)
    {
      sortMode = query.value;
    }
    if(sortMode === "Ascending")
    {
      return 0;
    }
    else if(sortMode === "Descending")
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  const AscendingCompare = function(a, b)
  {
      if (a.objName < b.objName)
        return -1;
      if (a.objName > b.objName)
        return 1;
      return 0;
  }

  const DescendingCompare = function(a, b)
  {
      if (a.objName < b.objName)
        return 1;
      if (a.objName > b.objName)
        return -1;
      return 0;
  }

  const SortClicked = function(evt)
  {
    search();
  }

  const SortModels = function(models)
  {
    const sortOrder = GetSortMode();
    var newModels = [];
    if(sortOrder === 0)
    {
      newModels = models.sort(AscendingCompare);
    }
    else if(sortOrder === 1)
    {
      newModels = models.sort(DescendingCompare);
    }
    return newModels;
  }

  const search = function () {

    let newModels = models.filter((model) => {
      return searchCondition(pageThis.state.searchValue, model);
    });

    newModels = SortModels(newModels);

    pageThis.setState({searchModels : newModels, currentPage : 1});
  }

  const handleChange = function (evt) {
    pageThis.setState({searchValue : evt.target.value});
    search();
  }

  const onClickFilter = function()
  {
    const filterText0 = document.getElementById('filter0Box').value;
    const filterText1 = document.getElementById('filter1Box').value;

    let newModels = models.filter((model) => {
      return filterCondition(filterText0, filterText1, model);
    });

    newModels = SortModels(newModels);

    pageThis.setState({searchModels : newModels, currentPage : 1});
  }

  var filtersRender = (<div></div>);
  if(filterOptions.length > 0)
  {
    filtersRender = (
      <div className="filtersDiv">
      <h6>Filters:</h6>
        <div className="filterDiv">
          <input id="filter0Box" name="filter0Box" type="text" placeholder={filterOptions[0]}></input>
        </div>
        <div className="filterDiv">
          <input id="filter1Box" name="filter1Box" type="text" placeholder={filterOptions[1]}></input>
        </div>
        <input type="button" height="50" width="50" value="Filter" id="filterButton" onClick={onClickFilter}></input>
      </div>
    );   
  }

  const content = (
    <div>
      <div className="input-field">
        <input id="SearchBox" type="text" placeholder="Search" value={props.searchValue} onChange={handleChange}></input>
      </div>
      <div className="sort-box">
        <input type="radio" name="sortOrder" value="Ascending" onClick={SortClicked}></input><label for="Ascending"> Ascending</label>
        <br/>
        <input type="radio" name="sortOrder" value="Descending" onClick={SortClicked}></input><label for="Descending"> Descending</label>
        <br/>
      </div>
      {filtersRender}
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
