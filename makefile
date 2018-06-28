GitlabID = pdiemi
RepoName = mibrary
SHA      = aa6851b84b733a3b2b6759a9b798d39226a19480

gitlabid:
	@echo "${GitlabID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

gitlab:
	@echo "https://gitlab.com/${GitlabID}/${RepoName}"

issues:
	@echo "http://www.gitlab.com/${GithubID}/${RepoName}/issues"

website:
	@echo "http://mibrary.me/"

members:
	@echo "http://www.gitlab.com/${GithubID}/${RepoName}/project_members"