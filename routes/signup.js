var express = require('express');
var router = express.Router();
var db = require('../db/mysql_db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {
      error: 0,
      user: req.user
  });
});

router.post('/proc', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var queryForValid = 'SELECT user_email FROM user_master WHERE user_email = ?';
    db.query(queryForValid, [username], function(err, result){
      if(err) {
        console.log('error:' ,err);
      } else {
        if(result.length == 0){
            var query = 'INSERT INTO user_master (user_email, user_password, user_signup_date) VALUES ?';
            var values = [
                [username, password, date]
            ];
            db.query(query, [values], function(err, results){
                if(err){
                    console.log('err', err);
                } else {
                    console.log(results);
                    res.redirect('/');
                }
            });

        } else {
           res.render('signup', {
               error: 1,
               user:req.user
           });
           console.log('Email is already exist', result.length);
        }
      }

    });
    //res.send(username + password);
});

module.exports = router;
