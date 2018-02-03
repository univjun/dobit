var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.user){
      console.log('req.user is defined:', req.user);
      res.render('index_test', {
          title: 'Express',
          user: req.user,
          isLoggedIn: true
      });
  } else {
      console.log('req.user is undefined');
      res.render('index_test', {
          title: 'Express',
          user: req.user,
          isLoggedIn:false
      });
  }
});

module.exports = router;
