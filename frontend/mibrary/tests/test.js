import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Book from '../src/Book';

var assert = require('assert');

class MyTestObject
{
    MyTestObject()
    {
        constructor()
        {
            this.title = "American History";
            this.subject = "fiction";
            this.authors = "Grace Chiu";
        }
    }
}

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
        myObject = new MyTestObject();
        assert.equal(searchCondition("am", myObject), true);
    });
    it('test2', function() 
    {
        myObject = new MyTestObject();
        assert.equal(searchCondition("a m", myObject), false);
    });
    it('test3', function() 
    {
        myObject = new MyTestObject();
        assert.equal(searchCondition("america", myObject), true);
    });
    it('test4', function() 
    {
        myObject = new MyTestObject();
        assert.equal(searchCondition(" ", myObject), true);
    });
    it('test5', function() 
    {
        myObject = new MyTestObject();
        assert.equal(searchCondition("gram", myObject), true);
    });
});

describe('filterCondition', function() 
{
    it('test1', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("", "Xeon", myObject), true);
    });
    it('test2', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "Xeon", myObject), false);
    });
    it('test3', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "", myObject), true);
    });
    it('test4', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "Chiu", myObject), false);
    });
    it('test5', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("", "Chiu", myObject), true);
    });
    it('test6', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("fiction", "Chiu", myObject), true);
    });
    it('test7', function() 
    {
        myObject = new MyTestObject();
        assert.equal(filterCondition("fiction", "Xeon", myObject), false);
    });
});



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });