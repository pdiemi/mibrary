function LoadBookSubjectData()
{
    var models = [];
    var subjectData = {};
    var result = "";

    const apiURL = "http://ec2-18-191-216-158.us-east-2.compute.amazonaws.com:5000/api/";
    fetch(apiURL+'books')
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson)
    {
      models = responseJson;
      alert("Test");
      alert(models.length);
  
      let modelsList = models.map((res) => 
      {
        return({
          objName : res.title,
          subject: res.subjects
        });
      });
  
      for(let model of modelsList)
      {
          if(subjectData[model.subject] === undefined)
          {
              subjectData[model.subject] = 1;
          }
          else
          {
              subjectData[model.subject] = subjectData[model.subject] + 1;
          }
      }
  
      for(var key in subjectData)
      {
          var value = subjectData[key];
          result += (key + "," + value + "\n");
      }
      console.log(result);
      return result;
  });
  return result;
}

function LoadGitHubCommitData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState==4 && this.status==200)
        {
            var gitlabCommits = JSON.parse(this.responseText);
            var totalCommits = gitlabCommits.length;
            var commits = {"lu": 0, "de": 0, "ph": 0, "aa": 0, "xe": 0, "au": 0};
            for(var i = 0; i<gitlabCommits.length; i++){
                commits[gitlabCommits[i].committer_email.substring(0,2)] +=1;
            }

            var chartData = Object.keys(commits).map(function(key){
                return commits[key];
            });
            console.log(chartData);
        }
    }
    xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/repository/commits?per_page=200&private_token=chH-nGQaqPXGfDdPyKzq", true);
    xhttp.send();
}

LoadGitHubCommitData();