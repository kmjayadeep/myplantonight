var express = require('express');
var router = express.Router();
var Yelp = require('yelp')
var User = require('../models/user')
var Bar = require('../models/bar')

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
        Bar.find({

        },function(err,bars){
            extBars = extBars.map(function(bar){
                for(var i=0;i<bars.length;i++){
                    if(bar.name == bars[i].name)
                        return bars[i]
                }
                return bar
            })
            console.log(extBars)
            res.json(extBars)
        })
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

router.put('/bar',function(req,res){
    let bar = new Bar(req.body)
    console.log(bar)
    if(req.body._id){
        Bar.findOne({
            _id:bar._id
        },function(err,b){
            if(err)
                return res.sendStatus(400)
            b.attending = bar.attending
            b.save(function(err,bar){
                if(err)
                    return res.sendStatus(400)
                res.json(bar)
            })
        })
    }else{
        bar.save(function(err,b){
            if(err)
                return res.sendStatus(400)
            return res.json(b)
        })
    }
})

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
