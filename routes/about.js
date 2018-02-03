var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', {
    title: 'Express',
    user:req.user,
  });
});


/* GET home page. */
router.get('/temp', function(req, res, next) {
    res.render('detail_new', {
        title: 'Express',
        user:req.user,
    });
});

module.exports = router;
