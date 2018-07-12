var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	var gitlabCommits = JSON.parse(this.responseText);
	document.getElementById("totalcommits").innerHTML = "Total Number of Commits: "+gitlabCommits.length;
	var commits = {"lu": 0, "de": 0, "ph": 0, "aa": 0, "xe": 0, "au": 0};
	for(var i = 0; i<gitlabCommits.length; i++){
		commits[gitlabCommits[i].committer_email.substring(0,2)] +=1;
	}
	for(var key in commits){
		document.getElementById(key+"commit").innerHTML = "Number of Commits: "+commits[key];
	}
}
xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/repository/commits?per_page=200&private_token=chH-nGQaqPXGfDdPyKzq", true);
xhttp.send();


xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	var gitlabIssues = JSON.parse(this.responseText);
	document.getElementById("totalissues").innerHTML = "Total Number of Issues: "+gitlabIssues.length;
	var issues = {"lu": 0, "de": 0, "pd": 0, "aa": 0, "xe": 0, "ma": 0};
	for(var i = 0; i<gitlabIssues.length; i++){
		issues[gitlabIssues[i].closed_by.username.substring(0,2)] +=1;
	}
	for(var key in issues){
		document.getElementById(key+"issue").innerHTML = "Number of Issues: "+issues[key];
	}
}
xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/issues?state=closed&private_token=chH-nGQaqPXGfDdPyKzq", true);
xhttp.send();