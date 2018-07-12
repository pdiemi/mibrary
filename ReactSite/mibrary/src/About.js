import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './About.css';

class About extends Component 
{
  constructor()
  {
    super();
  }

  componentDidMount()
  {
        this.About();
  }

  About()
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200)
        {
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
    }
    xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/repository/commits?per_page=200&private_token=chH-nGQaqPXGfDdPyKzq", true);
    xhttp.send();
    
    
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState==4 && this.status==200)
        {
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
    }
    xhttp.open("GET", "https://gitlab.com/api/v4/projects/7230045/issues?state=closed&private_token=chH-nGQaqPXGfDdPyKzq", true);
    xhttp.send();    
  }

  render() 
  {
    return (
      <div className="App">
        <header>
        <div class="container ">
            <div class="header">
                <a target="blank" href="index.html">
                    <img src="images/logos/logo7.png " class="img-responsive " alt="logo7 "></img>
                </a>
                <div class="topnav ">
                    <Link to='/'>Home</Link>
                    <Link to='/model'>Books</Link>
                    <Link to='/model'>Courses</Link>
                    <Link to='/model'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </div>
        </header>


    <div class="container">
        <div class="row">
            <div class="column middle">
                <div class="card">
                    <h2 class="card-title">
                        <b>What is Mibrary</b>
                    </h2>
                    <div>
                        <p class="text-justify">Mibrary is an open library to provide an avenue for students to donate or exchange their textbooks.
                            This will help students who have a financial barrier to their education, and in turn be of community
                            service.
                        </p>
                    </div>
                </div>

                <div class="clearfix"></div>
                <h2>
                    <div class="card">
                        <b>Who we are</b>
                    </div>

                </h2>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/AaronSaldana.ipeg">
                            <img src="images/AaronSaldana.jpeg" alt="Aaron Saldana" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Aaron Saldana</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="aacommit">Number of Commits: 0</p>
                            <p id="aaissue">Number of Issues: 0</p>
                            <p id="aatests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/AustinMager.jpg">
                            <img src="images/AustinMager.jpg" alt="Austin Mager" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Austin Mager</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="aucommit">Number of Commits: 0</p>
                            <p id="maissue">Number of Issues: 0</p>
                            <p id="autests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/DebarshiKundu.png">
                            <img src="images/DebarshiKundu.png" alt="Debarshi Kundu" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Debarshi Kundu</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="decommit">Number of Commits: 0</p>
                            <p id="deissue">Number of Issues: 0</p>
                            <p id="detests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/DiemiPham.png">
                            <img src="images/DiemiPham.png" alt="Diemi Pham" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Diemi Pham</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="phcommit">Number of Commits: 0</p>
                            <p id="pdissue">Number of Issues: 0</p>
                            <p id="phtests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/EdwinGutierrez.jpg">
                            <img src="images/EdwinGutierrez.jpg" alt="Edwin Gutierrez" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Edwin Gutierrez</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="xecommit">Number of Commits: 0</p>
                            <p id="xeissue">Number of Issues: 0</p>
                            <p id="xetests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="images/LucyLiu.png">
                            <img src="images/LucyLiu.png" alt="Lucy Liu" width="600" height="400"></img>
                        </a>
                        <div class="desc">
                            <h4>
                                <b>Lucy Liu</b>
                            </h4>
                            <br />
                            <p>Junior in Computer Science</p>
                            <br />
                            <p id="lucommit">Number of Commits: 0</p>
                            <p id="luissue">Number of Issues: 0</p>
                            <p id="lutests">Number of Unit Tests: 0</p>
                        </div>
                    </div>
                </div>

                <br />

                <div class="clearfix"></div>
            </div>


            <div class="column side">
                <div class="card">
                    <h2>
                        <b>What we have done</b>
                    </h2>
                    <div>
                        <p>
                            <li>
                                <b>
                                    <i>What GitLab says about our work</i></b>
                                <ul>
                                    <li id="totalcommits">Total Number of Commits: 0</li>
                                    <li id="totalissues">Total Number of Issues: 0</li>
                                    <li id="totaltests">Total Number of Unit Tests: 0</li>
                                </ul>
                            </li>
                        </p>
                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="card">
                    <h2>
                        <b>Sources</b>
                    </h2>
                    <div>
                        <p>
                            <p>
                                <i>(Coming soon...)</i>
                            </p>
                            <li>data
                                <ul>
                                    <li>links to the data
                                        <b>sources</b>
                                    </li>
                                    <li>description of
                                        <b>how</b> each was
                                        <b>scraped</b>
                                    </li>
                                </ul>
                            </li>
                        </p>
                    </div>
                </div>

                <div class="clearfix"></div>

                <div class="card">
                    <h2>
                        <b>Tools</b>
                    </h2>
                    <div>
                        <a href="https://gitlab.com/pdiemi/mibrary/blob/master/TechnicalReportPhase1_v3.pdf">
                            <b>Checkout our documentation</b>
                        </a>
                </div>
            </div>

            <div class="clearfix"></div>

            <div class="card">
                <h2>
                    <b>GitLab</b>
                </h2>
                <div>
                    <a href="https://gitlab.com/pdiemi/mibrary">
                        <b>Visit our GitLab repos</b>
                    </a>
                </div>
            </div>

            <div class="clearfix"></div>

            <div class="card" >
                <h2>
                    <b>Postman</b>
                </h2>
                <div>
                    <a href="https://documenter.getpostman.com/view/4703640/RWEjqJFc">
                        <b>Checkout our Postman API</b>
                    </a>
                </div>
            </div>

        </div>

    </div>
    </div>
    <div class="clearfix"></div>

    <div class="container">
        <div class="footer">Copyright &copy; 2018 SWE-IDB5-SUMMER2018</div>
    </div>
      </div>
    );
  }
}

export default About;