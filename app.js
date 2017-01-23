var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config')()
var mongoose = require('mongoose')
var User = require('./models/user')
var passport = require('passport')
var session = require('cookie-session')
// var MongoStore = require('connect-mongostore')(session);
mongoose.connect(config.dbUrl,function(err){
    if(err)
        console.log(err)
    else
        console.log('connected')
})


var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var FacebookStrategy = require('passport-facebook').Strategy

app.use(session({
    keys:['jagapoga']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user_id, done) {
    console.log(user_id)
    User.findById(user_id, done)
});

passport.use('facebook', new FacebookStrategy({
        clientID: config.facebookAppId,
        clientSecret: config.facebookAppSecret,
        callbackURL: config.facebookCallbackUrl,
        profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(profile)
            User.findOne({
                email: profile.emails[0].value
            }, function(err, user) {
                if (err)
                    return done(err)
                if (user) {
                    console.log(user)
                    if (user.facebook.id)
                        return done(null, user)
                    user.facebook = {
                        id: profile.id
                    }
                    return user.save(done)
                }
                var user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    facebook: {
                        id: profile.id
                    }
                })
                console.log(user)
                user.save(done)
            })
        })
    }
))

app.get('/auth/login',
    passport.authenticate('facebook', {
        scope: 'email'
    }),
    function(req, res) {})

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/')
    }
)

app.get('/auth/logout',function(req,res){
    req.logout()
    res.redirect('/')
})

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
