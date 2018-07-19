var assert = require('assert');


function Model()
{

    var listModelsJson = JSON.parse("{ \"books\" : [\"one\", \"two\", \"three\", \"four\", \"five\", \"six\", \"seven\", \"eight\", \"nine\", \"ten\", \"eleven\"] }");
    var newModels = []
    for(var i = 0; i<listModelsJson.books.length; i++){
      newModels[i] = listModelsJson.books[i];
    }
    return newModels;
}

describe('Model', function() 
{
    it('test1', function() 
    {
        assert.notEqual(Model(), 0);
    });
});