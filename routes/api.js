var express = require('express');
var router = express.Router();
var Yelp = require('yelp')
var User = require('../models/user')

var yelp = new Yelp({
    consumer_key: "qXHtGS14FEUgQCaQx1NLhQ",
    consumer_secret: "QaXUu07XYss4ZBPujXNysQPKVwo",
    token: "hEqj3vGFdvISd5zTGYHsQ-ttUWLzts6O",
    token_secret: "_a4x-PfQVoOMV9ZLxalZSEazZHU"
})

router.get('/bar/search/:query', function(req, res, next) {
    let query = req.params.query
    yelp.search({ category_filter: 'bars', location: query }, function(err, data) {
        if (err)
            return res.status(400).json(err)
        var extBars = data.businesses.map(function(item) {
            return {
                name: item.name,
                url: item.url,
                image_url: item.image_url,
                snippet: item.snippet_text,
                attending: []
            };
        });
   		res.json(extBars)
    })
    if(req.user){
        User.findOne({
            _id:req.user._id
        },function(err,user){
            if(err)
                return
            user.location = query
            user.save()
        })
    }
});

router.get('/profile', function(req, res) {
    console.log(req.user)
    if(!req.isAuthenticated())
        return res.status(401).json('not')
    User.findOne({
        _id: req.user._id
    }, function(err, user) {
        res.json(user)
    })
})

module.exports = router;
