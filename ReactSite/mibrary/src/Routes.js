import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Model from './Model'
import About from './About'

const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/model' component={Model}/>
            <Route path='/about' component={About}/>
        </Switch>
    </main>
)

export default Routes