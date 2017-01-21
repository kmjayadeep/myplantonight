import React from 'react';
import barService from '../services/barService.js'

class App extends React.Component {
	constructor(){
		super()
		barService.search('hello')
			.then((res)=>{
				console.log(res)
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	render() {
		return <h1>Hello</h1>
	}
}

export default App