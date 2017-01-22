import React from 'react';
import barService from '../services/barService.js'
import {Well,Glyphicon,Button,FormGroup,FormControl,InputGroup,Row,Col} from 'react-bootstrap'
import $ from 'jquery'

class Home extends React.Component {
	constructor(){
		super()
		this.state = {
			isLoading:false
		}
		this.search = this.search.bind(this)
	}
	search(event){
		event.preventDefault()
		if(this.state.isLoading) return
		let query = $('#search-input').val()
		this.setState({
			isLoading:true
		})
		barService.search(query)
			.then((res)=>{
				console.log(res)
				this.setState({
					isLoading:false
				})
			})
			.catch((err)=>{
				console.log(err)
				this.setState({
					isLoading:false
				})
			})
	}
	render() {
		return (
			<Well bsSize="large">
				<h1 className="heading text-center">Whats your plan tonight?</h1>
				<div className="icons text-center">
					<Glyphicon glyph="glass"/>
				</div>
				<Row>
					<Col md={8} mdOffset={2}>
						<form onSubmit={this.search}>
							<FormGroup>
								<InputGroup>
									<FormControl type="text" id="search-input"/>
									<InputGroup.Button>
										<Button
											bsStyle="primary"
											disabled={this.state.isLoading}
											onClick={this.search}
										>
											{this.state.isLoading?'Loading':'Search'}
										</Button>
									</InputGroup.Button>
								</InputGroup>
							</FormGroup>
						</form>
					</Col>
				</Row>
			</Well>
		)
	}
}

export default Home