import React from 'react'
import {Row,Col} from 'react-bootstrap'

export default class AppHandler extends React.Component{
	render(){
		return (
			<div className="app-container">
				<header>
				</header>
				<div className="app-content">{this.props.children}</div>
				<footer>
				</footer>
			</div>
		)
	}
}