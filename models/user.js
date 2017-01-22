var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: String,
    email: String,
    facebook: {
        id: String
    },
    location: String
})

module.exports = mongoose.model('user', schema)
