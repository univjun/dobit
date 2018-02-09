var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var passport = require('passport');
var db = require('../db/mysql_db');


//
// var users = [
//     {
//         username : 'lucanidae',
//         password : '1111',
//         displayName : 'Sanmin'
//     }
// ]

/* GET home page. */
router.get('/', function(req, res, next) {
    var message = req.flash('loginMessage');


    console.log(req.session);
    //res.render('login', {message: req.flash('loginMessage')});
    if(req.user){
        res.redirect('/');
    } else {
        res.render('login', {
            message: message,
            user:req.user,
            isLoggedIn: false
        });
    }

});

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log('serializeUser user:', user);
    done(null, user.user_id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser id: ', id);
    db.query("SELECT * FROM user_master WHERE user_id = ? ",[id], function(err, rows){
        return done(err, rows);
    });
});

passport.use(new LocalStrategy({passReqToCallback : true} , function(req, username, password, done){
    var query = 'SELECT * FROM user_master WHERE user_email = ?';
    req.session.returnTo = req.path;

    db.query(query, [username], function(err, rows){
        if(err){
            console.log('failed to connect db');
            return done(err);
        }
        if(!rows.length){
            return done(null, false, req.flash('loginMessage','User Not Found.'));
        }
        if(!(password === rows[0].user_password)){
            console.log('login failed: wrong password');
            return done(null, false, req.flash('loginMessage', 'Wrong password.'));
        }
        console.log('login success', rows[0]);
        return done(null, rows[0]);



    });


}));

passport.use(new FacebookStrategy({
        clientID: '1623452237717047',
        clientSecret: 'e24c87ec5bd70e7c757aed8a8773a540',
        callbackURL: "http://localhost:3000/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        var query = "SELECT * FROM user_master WHERE user_facebook_id = ?"
        var facebookId = profile.id;
        var displayName = profile.displayName;
        db.query(query, [facebookId], function(err, rows){
            if(err){
                console.log('failed to connect db', err);
            }
            if(!rows.length){
                var query = "INSERT INTO `user_master` (`user_displayName`, `user_facebook_id`) VALUES ?";
                var values = [
                    [displayName, facebookId]
                ];
                db.query(query, [values], function(err, resultOfInsert){
                    if(err){
                        console.log('failed to insert into db',err);
                    }
                    console.log('insert success and insert result is:',resultOfInsert);

                    db.query("SELECT * FROM user_master WHERE user_facebook_id = ?", [facebookId], function(err, result){
                        if(err){
                            console.log('failed to select * from insertId');
                        }
                        return cb(null, result[0]);
                    });

                });
            } else {
                return cb(null, rows[0]);
            }
        })
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));


// router.post('/login_proc', passport.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect:'/login',
//     failureFlash: true
// }));


router.post('/login_proc', function(req, res, next){
    console.log('currentURL: ',req.headers.referer);
    passport.authenticate('local', {
        successRedirect: req.headers.referer,
        failureRedirect: req.headers.referer,
        failureFlash: true
    })(req,res,next);
});


router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

module.exports = router;


