import React, { Component } from 'react';
import {Link } from 'react-router-dom';

export function Navbar() {
	return (
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
        </header>//
	);
}

// export function MainContainer(content) {
// 	return (

// 	);
// }