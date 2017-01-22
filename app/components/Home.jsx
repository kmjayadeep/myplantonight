import React from 'react';
import barService from '../services/barService.js'
import {Well,Glyphicon,Button,FormGroup,FormControl,InputGroup,Row,Col,ListGroup,ListGroupItem,Panel,Media} from 'react-bootstrap'
import $ from 'jquery'

class Home extends React.Component {
	constructor(){
		super()
		this.state = {
			isLoading:false,
			bars:[]
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
					isLoading:false,
					bars:res
				})
			})
			.catch((err)=>{
				console.log(err)
				this.setState({
					isLoading:false,
					bars:[]
				})
			})
	}
	render() {
		console.log(this.props.profile)
		return (
			<div>
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
				<BarList bars={this.state.bars}/>
			</div>
		)
	}
}

class BarList extends React.Component{
	constructor(){
		super()
	}
	render(){
		let bars = this.props.bars.map((bar,index)=>{
			return <Bar bar={bar} key={index}/>
		})
		return (
			<Panel>
				{bars}
			</Panel>
		)
	}
}

class Bar extends React.Component{
	constructor(){
		super()
	}
	render(){
		return (
			<Media>
				<Media.Left align="middle">
					<a href={this.props.bar.url} target="_blank"><img width={64} height={64} src={this.props.bar.image_url} alt="Image"/></a>
				</Media.Left>
				<Media.Body>
				<Media.Heading>
					{this.props.bar.name}
				</Media.Heading>
				<p>{this.props.bar.snippet}</p>
				</Media.Body>
			</Media>
		)
	}
}

export default Home