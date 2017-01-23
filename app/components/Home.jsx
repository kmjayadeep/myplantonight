import React from 'react';
import barService from '../services/barService.js'
import {Well,Glyphicon,Button,FormGroup,FormControl,InputGroup,Row,Col,ListGroup,ListGroupItem,Panel,Media} from 'react-bootstrap'
import $ from 'jquery'

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isLoading:false,
			bars:[],
			loaded:false

		}
		this.search = this.search.bind(this)
		this.going = this.going.bind(this)
	}
	search(event){
		if(this.state.isLoading)
			return
		if(event)
			event.preventDefault()
		let query = $('#search-input').val()
		this.setState({
			isLoading:true
		})
		barService.search(query)
			.then((res)=>{
				console.log(res)
				this.setState({
					isLoading:false,
					bars:res,
					loaded:true
				})
			})
			.catch((err)=>{
				console.log(err)
				this.setState({
					isLoading:false,
					bars:[],
					loaded:true
				})
			})
	}
	componentDidUpdate(){
		if(!this.props.profile)
			return
		let location = this.props.profile.location
		if(this.state.loaded)
			return
		$('#search-input').val(location)
		this.search()
	}
	going(bar){
		console.log('going')
		if(!this.props.profile)
			return
		if(bar.attending.indexOf(this.props.profile._id)==-1){
			bar.attending.push(this.props.profile._id)
		}else{
			bar.attending[bar.attending.indexOf(this.props.profile._id)] = null
			bar.attending = bar.attending.filter((b)=>{
				return b!=null
			})
		}
		console.log(bar)
		barService.going(bar)
		.then((newBar)=>{
			let newBars = this.state.bars.map(b=>{
				if(b.name==newBar.name)
					return newBar
				return b
			})
			console.log(newBars)
			this.setState({
				bars:newBars
			})
		}).catch(()=>{})
	}
	render() {
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
				<BarList bars={this.state.bars} going={this.going}/>
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
			return <Bar bar={bar} key={index} going={this.props.going}/>
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
					<Button className="going" onClick={this.props.going.bind(this,this.props.bar)}>{this.props.bar.attending.length} Going</Button>
				</Media.Heading>
				<p>{this.props.bar.snippet}</p>
				</Media.Body>
			</Media>
		)
	}
}

export default Home