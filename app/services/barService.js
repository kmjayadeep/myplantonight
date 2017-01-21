let $ = require('jquery')
let promise = require('es6-promise')
let resourceUrl = "http://localhost:3000/api/bar";

module.exports = {
	search: (query)=>{
		let Promise = promise.Promise
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:resourceUrl+'/search/'+query,
				method:'GET',
				dataType:'json',
				contentType:'application/json',
				success:resolve,
				error:reject
			})
		})
	}
}