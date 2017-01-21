import {Route,Router} from 'react-router'
import React from 'react'

import AppHandler from './components/AppHandler.jsx'
import Home from './components/Home.jsx'

const Routes = (props)=>{
	return (
		<Router {...props}>
			<Route path="/" component={AppHandler}/>
			<Route path="/home" component={Home}/>
		</Router>
	)
}

export default Routes