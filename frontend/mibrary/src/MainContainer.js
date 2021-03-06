import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './MainPage.css';

export const apiURL = "http://ec2-18-191-216-158.us-east-2.compute.amazonaws.com:5000/api/";

function Navbar() {
	return (
        <header>
        <div className="container ">
            <div className="header">
                <Link to='/'>
                    <img src="/images/logos/logo7.png" className="img-responsive " alt="logo7 "></img>
                </Link>
                <div className="topnav ">
                    <Link to='/'>Home</Link>
                    <Link to='/books'>Books</Link>
                    <Link to='/courses'>Courses</Link>
                    <Link to='/users'>Users</Link>
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