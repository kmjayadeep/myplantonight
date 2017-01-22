let $ = require('jquery')
let promise = require('es6-promise')
let resourceUrl = "http://localhost:3000/api/";

module.exports = {
    search: (query) => {
        let Promise = promise.Promise
        return new Promise((resolve, reject) => {
            $.ajax({
                url: resourceUrl + 'bar/search/' + query,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            })
        })
    },
    account: () => {
        let Promise = promise.Promise
        return new Promise((resolve, reject) => {
            $.ajax({
                url: resourceUrl + 'profile/',
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            })
        })
    }
}
