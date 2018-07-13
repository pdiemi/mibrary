import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './Model.css';

class BookDetail extends Component 
{
  constructor()
  {
    super();
  }

  componentDidMount()
  {
        this.Model();
  }

  Model()
  {
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
                    <Link to='/book'>Books</Link>
                    <Link to='/course'>Courses</Link>
                    <Link to='/user'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </div>
        </header>
        <div>
        <div class="clearfix"></div>
	<div class="container">
		<div class="card">
			<h1 class="card-title">Extreme Programming Installed</h1>
			<div>
				<img class="img-fluid" src="images/books/xpinstalled.jpg"></img>
			</div>
			<br/> ISBN
			<ul>
				<li>ISBN-13: 978-0-201-70842-4</li>
				<li>ISBN-10: 0-201-70842-6</li>
			</ul>
			<br/> Authors
			<ul>
				<li>Ron Jeffries</li>
				<li>Ann Anderson</li>
				<li>Chet Hendrickson</li>
				<li>Kent Beck</li>
			</ul>
			<br/> Publisher Addison-Wesley
			<br/> Year 2001
			<br/> Edition 1st
			<br/> Being offered by
			<ul>
				<li>
					<a href="../users/user1.html">User A</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="clearfix"></div>
	<div class="container">
		<div class="footer">Copyright &copy; 2018 SWE-IDB5-SUMMER2018</div>
	</div>

        </div>
      </div>
    );
  }
}

export default BookDetail;