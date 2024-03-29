import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Book from './Book'
import Course from './Course'
import User from './User'
import About from './About'
import BookDetail from './BookDetail'

const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/book' component={Book}/>
            <Route path='/course' component={Course}/>
            <Route path='/user' component={User}/>
            <Route path='/about' component={About}/>
            <Route path='/bookdetail' component={BookDetail}/>
        </Switch>
    </main>
)

export default Routes