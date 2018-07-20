import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './MainPage.css';

function Navbar() {
	return (
        <header>
        <div className="container ">
            <div className="header">
                <a target="blank" href="index.html">
                    <img src="images/logos/logo7.png " className="img-responsive " alt="logo7 "></img>
                </a>
                <div className="topnav ">
                    <Link to='/'>Home</Link>
                    <Link to='/books'>Books</Link>
                    <Link to='/course'>Courses</Link>
                    <Link to='/user'>Users</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </div>
        </header>
	);
}

export function MainContainer(content) {
	return (
      <div className="App">
        <div className="container ">
            <div className="header">
                <Navbar />
            </div>
        </div>
        <div className="clearfix"></div>

        <div className="container">
            {content.content}
        </div>
        <div className="clearfix"></div>

        <div className="container">
            <div className="footer">Copyright &copy; 2018 SWE-IDB5-SUMMER2018</div>
        </div>

      </div>
	);
}