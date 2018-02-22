var express = require('express');
var router = express.Router();
var db = require('../db/mysql_db');
/**
 * 차트 테스트 페이지
 */

router.get('/', function(req, res, next) {
    var message = req.flash('loginMessage');
    var query = "SELECT * FROM beer_master";
    db.query(query,function (err, records, fields) {
        if(err){
            res.send('잘못된 경로입니다.');
            console.log('db connect failed : ', err);
        } else {

            console.log("레코드:",records);
            var isLoggedIn = req.user;
            res.render('chart',{
                records: records,
                isLoggedIn: isLoggedIn,
                user: req.user,
                message: message
            });
        }

    });
});

/**
 * Save Beer Data
 */
router.post('/save_beer', function(req, res, next) {

    //res.send('Saved Complete');
    var beerName = req.body.beername;
    var beerClass1 = req.body.beerclass1;
    var beerClass2 = req.body.beerclass2;
    var beerClass3 = req.body.beerclass3;
    var beerClass4 = req.body.beerclass4;
    var beerInfo1 = req.body.beerinfo1;
    var beerInfo2 = req.body.beerinfo2;
    var beerInfo3 = req.body.beerinfo3;
    var beerInfo4 = req.body.beerinfo4;
    var data = [beerName, beerClass1, beerClass2, beerClass3, beerClass4, beerInfo1, beerInfo2, beerInfo3, beerInfo4];

    var query = "INSERT INTO beer_master (beer_name, temp_class1, temp_class2, temp_class3, temp_class4, temp_info1, temp_info2, temp_info3, temp_info4)" +
        " VALUES (?)";
    db.query(query, [data], function(err, result){
        if(err){
            console.log('error occurred:', err);
        } else {
            res.redirect('/chart');
        }
    } );
    // var commName = req.params.communityName;
    // var id = req.params.rid;
    // var comments = req.body.comments;
    // var table_name = 'bo_' + commName + '_master'; //bo_free_master
    // var up_check_table_name = 'bo_' + commName + '_up';
    // //var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // var date = moment().format('YYYY-MM-DD HH:mm:ss');
    // var comment_table_name = 'bo_' + commName + '_comment';
    // //로그인 되어 있으면
    // if(req.user) {
    //     var user_id = req.user[0].user_id;
    //     var queryForCheck = "SELECT * FROM " + up_check_table_name + " WHERE up_user_idx =" + user_id + " AND master_idx = " + id;
    //     var queryToUp = "UPDATE " + table_name + " SET up = up + 1 WHERE idx = " + id;
    //     var queryToUpdb = "INSERT INTO " + up_check_table_name + " (master_idx, up_user_idx, reg_date) VALUES (?)";
    //     var values = [
    //         [id, user_id, date]
    //     ];
    //     db.query(queryForCheck, function (err, result) {
    //         if (err) {
    //             console.log('error occured:', err);
    //         } else {
    //             if (result[0]) {
    //                 //console.log(result[0]);
    //                 //res.send('이미 추천한 게시물입니다.');
    //                 //req.flash('upMessage', 'Already Up');
    //                 var query = "DELETE FROM "+ up_check_table_name +" WHERE up_user_idx = " + user_id + " AND master_idx =" + id;
    //                 db.query(query, function(err, result){
    //                     if(err){
    //                         res.send("잘못된 접근입니다.");
    //                         console.log(err);
    //                     } else {
    //                         var query2 = "UPDATE " + table_name + " SET up = up - 1 WHERE idx = "+id;
    //                         db.query(query2, function(err, result){
    //                             if(err){
    //                                 res.send("잘못된 접근입니다.2");
    //                                 console.log(err);
    //
    //                             } else {
    //                                 res.redirect('/community/' + commName + '/' + id);
    //                             }
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 db.query(queryToUpdb, values, function (err, result2) {
    //                     if (err) {
    //                         console.log('err occurred : ', err);
    //
    //                     } else {
    //                         db.query(queryToUp);
    //                         res.redirect('/community/' + commName + '/' + id);
    //                     }
    //                 });
    //
    //             }
    //         }
    //     });
    //
    //
    // }
});



module.exports = router;