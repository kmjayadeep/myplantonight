import React from 'react'
import {Row,Col,Nav,NavItem} from 'react-bootstrap'
import barService from '../services/barService'
import Home from './Home.jsx'

export default class AppHandler extends React.Component{
	constructor(){
		super()
		this.state = {
			auth:'#',
			isLoggedIn:false
		}
		barService.account()
		.then(profile=>{
			console.log(profile)
			this.setState({
				auth:'/auth/logout',
				isLoggedIn:true,
				profile: profile
			})
		}).catch(err=>{
			this.setState({
				auth:'/auth/login',
				isLoggedIn:false
			})
		})
	}
	render(){
		let loginButton = (
						<NavItem eventKey={2} href={this.state.auth}>{this.state.isLoggedIn?'Logout':'Login'}</NavItem>
		)
		if(this.state.auth=='#')
			loginButton = ''
		return (
			<div className="container">
				<header>
					<Nav bsStyle="pills" activeKey={1}>
						<NavItem eventKey={1} href="/">Home</NavItem>
						{loginButton}
					</Nav>
				</header>
				<div className="app-content">
					<Home profile={this.state.profile}/>
				</div>
				<footer>
				</footer>
			</div>
		)
	}
}