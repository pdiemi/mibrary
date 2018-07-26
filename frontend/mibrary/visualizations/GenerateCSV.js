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

function LoadGitLabCommitData()
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

function LoadGitLabIssueData()
{
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState==4 && this.status==200)
        {
            var gitlabIssues = JSON.parse(this.responseText);
            var totalIssues = gitlabIssues.length;
            var issues = {"lu": 0, "de": 0, "pd": 0, "aa": 0, "xe": 0, "ma": 0};
            for(var i = 0; i<gitlabIssues.length; i++){
                issues[gitlabIssues[i].closed_by.username.substring(0,2)] +=1;
            }
            var chartData = Object.keys(issues).map(function(key){
                return issues[key];
            });
            console.log(chartData);
        }
    }
    xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/issues?state=closed&private_token=chH-nGQaqPXGfDdPyKzq", true);
    xhttp.send();    
}

function LoadCourseData()
{
    var models = [];
    var departmentData = {};
    var result = "";

    const apiURL = "http://ec2-18-191-216-158.us-east-2.compute.amazonaws.com:5000/api/";
    fetch(apiURL+'course/institution/3658')
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson)
    {
      models = responseJson;
  
      let modelsList = models.map((res) => 
      {
        return({
          objName : res.course_name,
          department: res.department
        });
      });
  
      for(let model of modelsList)
      {
          if(departmentData[model.department] === undefined)
          {
            departmentData[model.department] = 1;
          }
          else
          {
            departmentData[model.department] = departmentData[model.department] + 1;
          }
      }
  
      for(var key in departmentData)
      {
          var value = departmentData[key];
          result += (key + "," + value + "\n");
      }
      console.log(result);
      return result;
  });
  return result;
}

function LoadTreeData()
{
    var models = [];
    var treeTypeData = []
    var result = "";

    const apiURL = "http://api.societree.me/api/trees";
    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson)
    {
      models = responseJson.objects;
      let modelsList = models.map((res) => 
      {
        return({
          objName : res.name,
          leaf_type: res.leaf_type
        });
      });

      for(let model of modelsList)
      {
          if(treeTypeData[model.leaf_type] === undefined)
          {
            treeTypeData[model.leaf_type] = 1;
          }
          else
          {
            treeTypeData[model.leaf_type] = treeTypeData[model.leaf_type] + 1;
          }
      }
  
      for(var key in treeTypeData)
      {
          var value = treeTypeData[key];
          result += (key + "," + value + "\n");
      }

      console.log(result);
      return result;
    });
    return result;
}

LoadTreeData();