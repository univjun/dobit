var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var message = req.flash('loginMessage');

  if(req.user){
      console.log('req.user is defined:', req.user);
      res.render('index_test', {
          title: 'Express',
          user: req.user,
          isLoggedIn: true,
          message: message
      });
  } else {
      console.log('req.user is undefined');
      res.render('index_test', {
          title: 'Express',
          user: req.user,
          isLoggedIn:false,
          message: message
      });
  }
});

module.exports = router;
