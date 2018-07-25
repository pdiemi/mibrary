var assert = require('assert');

class MyTestObject
{
    //MyTestObject()
    //{
        constructor()
        {
            this.title = "American History";
            this.subject = "fiction";
            this.authors = "Grace Chiu";
        }
    //}
}

function searchCondition(queryText, model)
{
  if(queryText.length == 0 || model.title.toLowerCase().includes(queryText.toLowerCase()))
  {
    return true;
  }
  return false;
}

function filterCondition(filter0, filter1, model)
{
  if((filter0.length == 0 || model.subject.toLowerCase().includes(filter0.toLowerCase())) && (filter1.length == 0 || model.authors.toLowerCase().includes(filter1.toLowerCase())))
  {
    return true;
  }
  return false;
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
        let myObject = new MyTestObject();
        assert.equal(searchCondition("am", myObject), true);
    });
    it('test2', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(searchCondition("a m", myObject), false);
    });
    it('test3', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(searchCondition("america", myObject), true);
    });
    it('test4', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(searchCondition(" ", myObject), true);
    });
    it('test5', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(searchCondition("gram", myObject), false);
    });
});

describe('filterCondition', function() 
{
    it('test1', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("", "Xeon", myObject), false);
    });
    it('test2', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "Xeon", myObject), false);
    });
    it('test3', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "", myObject), false);
    });
    it('test4', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("nonfiction", "Chiu", myObject), false);
    });
    it('test5', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("", "Chiu", myObject), true);
    });
    it('test6', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("fiction", "Chiu", myObject), true);
    });
    it('test7', function() 
    {
        let myObject = new MyTestObject();
        assert.equal(filterCondition("fiction", "Xeon", myObject), false);
    });
});

/*it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });*/