import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Book from '../src/Book';

var assert = require('assert');


function ParseJSON()
{

    var listModelsJson = JSON.parse("{ \"books\" : [\"one\", \"two\", \"three\", \"four\", \"five\", \"six\", \"seven\", \"eight\", \"nine\", \"ten\", \"eleven\"] }");
    var newModels = []
    for(var i = 0; i<listModelsJson.books.length; i++){
      newModels[i] = listModelsJson.books[i];
    }
    return newModels;
}

describe('ParseJSON', function() 
{
    it('test1', function() 
    {
        assert.notEqual(ParseJSON(), 0);
    });
});

describe('searchCondition', function() 
{
    it('test1', function() 
    {
        assert.equal(searchCondition("am", "American History"), true);
    });
    it('test2', function() 
    {
        assert.equal(searchCondition("a m", "American History"), false);
    });
    it('test3', function() 
    {
        assert.equal(searchCondition("america", "American History"), true);
    });
    it('test4', function() 
    {
        assert.equal(searchCondition(" ", "American History"), true);
    });
    it('test5', function() 
    {
        assert.equal(searchCondition("gram", "Extreme Programming"), true);
    });
});


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });