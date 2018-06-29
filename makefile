GitlabID = pdiemi
RepoName = mibrary

gitlabid:
	@echo "${GitlabID}"

reponame:
	@echo "${RepoName}"

gitlab:
	@echo "https://gitlab.com/${GitlabID}/${RepoName}"

issues:
	@echo "http://www.gitlab.com/${GithubID}/${RepoName}/issues"

website:
	@echo "http://mibrary.me/"

members:
	@echo "http://www.gitlab.com/${GithubID}/${RepoName}/project_members"