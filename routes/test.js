var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('test', {
        title: 'Express',
        user:req.user,
    });
});

// router.get('/', function(req, res, next) {
//     res.render('index_test', {
//         title: 'Express',
//         user:req.user,
//     });
// });
//
//
// router.get('/', function(req, res, next) {
//     res.render('community_new', {
//         title: 'Express',
//         user:req.user,
//     });
// });
//
// router.get('/', function(req, res, next) {
//     res.render('write_new', {
//         title: 'Express',
//         user:req.user,
//     });
// });


module.exports = router;
