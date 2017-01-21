import {Route,IndexRoute,Router,browserHistory} from 'react-router'
import React from 'react'

import AppHandler from './components/AppHandler.jsx'
import Home from './components/Home.jsx'

const routes = (
	<Route path="/" component={AppHandler}>
		<IndexRoute component={Home}/>
	</Route>
)

export default class Routes extends React.Component{
	render(){
		return (
			<Router history={browserHistory} routes={routes}/>
		)
	}
}