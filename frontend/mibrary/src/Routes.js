import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Book from './Book'
import Course from './Course'
import User from './User'
import About from './About'
import BookDetail from './BookDetail'
import UserDetail from './UserDetail'
import CourseDetail from './CourseDetail'

const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/books' component={Book}/>
            <Route path='/courses' component={Course}/>
            <Route path='/users' component={User}/>
            <Route path='/about' component={About}/>
            <Route path='/book/:isbn' component={BookDetail}/>
            <Route path='/user/:user_id' component={UserDetail}/>
            <Route path='/course/:course_id' component={CourseDetail}/>
        </Switch>
    </main>
)

export default Routes