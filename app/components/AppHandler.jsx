import React from 'react'
import {Row,Col,Nav,NavItem} from 'react-bootstrap'

export default class AppHandler extends React.Component{
	render(){
		return (
			<div className="container">
				<header>
					<Nav bsStyle="pills" activeKey={1}>
						<NavItem eventKey={1} href="/">Home</NavItem>
						<NavItem eventKey={2}>Login</NavItem>
					</Nav>
				</header>
				<div className="app-content">{this.props.children}</div>
				<footer>
				</footer>
			</div>
		)
	}
}