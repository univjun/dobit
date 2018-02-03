var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var db = require('../db/mysql_db');
var moment = require('moment');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('community', { title: 'Express' });
// });
router.get('/:communityName', function(req, res, next) {
    var commName = req.params.communityName; // free

    var table_name = 'bo_' + commName + '_master'; //bo_free_master
    console.log(table_name);
    var query = "SELECT "+table_name+".*,user_master.user_email FROM "+table_name+" INNER JOIN user_master ON "+table_name+".writer_id = user_master.user_id ORDER BY idx DESC;"
    db.query(query,function (err, records, fields) {
        if(err){
            res.send('잘못된 경로입니다.');
            console.log('db connect failed : ', err);
        } else {

            console.log("레코드:",records);
            //res.send(records);
            var isLoggedIn = req.user;
            var commName = req.params.communityName; //test1
            //res.send('안녕?'+commName);
            //console.log('edit_date: ',moment(records[0].edit_date).format('YYYY-MM-DD'));
            res.render('board_template_new',{
                commName: commName,
                records: records,
                isLoggedIn: isLoggedIn,
                user: req.user
            });
        }

    });
});


router.get('/:communityName/write', function(req, res, next) {
    if(req.user){
        var commName = req.params.communityName;
        res.render('write',{
            commName:commName,
            user: req.user
        })
    } else {
        res.redirect('/login');
    }

    //res.send('responsessssss');
});


router.get('/:communityName/:rid', function(req, res, next) {
    var message = req.flash('loginMessage');
    var commName = req.params.communityName; // free
    var table_name = 'bo_' + commName + '_master'; //bo_free_master
    var comment_table_name = 'bo_' + commName + '_comment'; //bo_free_comment
    var comment_re_table_name = 'bo_' + commName + '_comment_re';//bo_free_comment_re
    var id = req.params.rid;
    var query ="SELECT "+table_name+".*,user_master.user_email FROM "+table_name+" INNER JOIN user_master ON "+table_name+".writer_id = user_master.user_id WHERE idx = "+id;
   // var query = "SELECT * FROM "+table_name+" WHERE idx = "+id;
    db.query(query, function(err, record, fields){
        if(err){
            console.log('error: ',err);

        } else {
            var query2 = "SELECT * FROM "+comment_table_name+" WHERE master_idx = "+id;
            db.query(query2, function(err, comment_records, fields){

                if(err){
                    console.log('err',err);
                }else {
                    var query3 = "SELECT * FROM "+comment_re_table_name+" WHERE master_idx = "+id;
                    db.query(query3, function(err, comments_reply_records, fields){
                        if(err){
                            console.log('err',err);
                        } else {
                            res.render('board_contents_new', {
                                commName: commName,
                                record: record,
                                user: req.user,
                                rid: id,
                                comments: comment_records,
                                commentsReply: comments_reply_records,
                                message:message
                            });
                            console.log('reply: ',comments_reply_records);
                        }
                    });


                }



            });

        }
    });

});


//show profile
router.get('/:communityName/:rid/show_profile', function(req, res, next) {
    // if(req.user){
    //
    // } else {
    // }
    var commName = req.params.communityName;
    var id = req.params.rid;
    res.send('id:' + id + 'communityName:'+commName);

    //res.send('responsessssss');
});

router.get('/:communityName/:rid/edit', function(req, res, next) {
    var id = req.params.rid;
    var commName = req.params.communityName;
    db.query('SELECT * FROM test_table WHERE id= ?',[id], function(err, record, fields){
        if(err){
            console.log('error: ',err);

        } else {
            res.render('edit', {
                commName:commName,
                record:record,
                rid:id,
                user: req.user
            });

        }
    });

});

//글쓰기
router.post('/:communityName/write_proc', function(req, res, next) {
    var commName = req.params.communityName;
    var title = req.body.title;
    var contents = escape(req.body.editor1);
    //var writer_id = req.user.user_id;
    var writer_id = '1';
    var reg_date = Date.now(); ////<<<<여기 고치기

    var table_name = "bo_"+commName+"_master";
    var data = [[title, contents, writer_id,reg_date]];
    //console.log(data);
    var query = 'INSERT INTO '+table_name+' (title,contents,writer_id,reg_date) VALUES (?)';

    db.query(query, data, function(err,results){
        if(err){
            res.send('글 등록이 실패하였습니다.');
            console.log('error occurred:',err);
        } else {
            //res.send(results);
            res.redirect('/community/'+commName);
        }
    });
});


router.post('/:communityName/:rid/edit_proc', function(req, res, next) {
    var commName = req.params.communityName;
    var cTitle = req.body.title;
    var cContents = req.body.editor1;
    var cAuthor = req.body.author;
   // var cDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var id = req.params.rid;
    var data = [cTitle, cContents, cAuthor, id];
    var query = 'UPDATE test_table SET title = ?, contents = ?, author = ?, WHERE id = ?';

    db.query(query, data, function(err,results){
        if(err){
            console.log('error occurred:',err)
        } else {
            //res.send(results);
            res.redirect('/community/'+commName+'/'+id);
        }
    });
});

router.post('/:communityName/:rid/delete', function(req, res, next) {
    var commName = req.params.communityName;
    var id = req.params.rid;
    var query = 'DELETE FROM test_table WHERE id = ?';
    db.query(query, id, function(err,results){
        if(err){
            console.log('error occurred:',err)
        } else {
            //res.send(results);
            res.redirect('/community/'+commName);
        }
    });
});

/**
 * INSERT COMMENT
 */
router.post('/:communityName/:rid/insert_comments', function(req, res, next) {
    var commName = req.params.communityName;
    var id = req.params.rid;
    var user_id = req.user[0].user_id;
    var comments = req.body.comments;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var query = 'INSERT INTO `test_table_comments` (`user_id`, `comments`,`date`,`community`, `test_table_id`) VALUES ?';
    var values = [
        [user_id, comments, date, commName, id ]
    ];
    db.query(query, [values], function(err,results){
        if(err){
            console.log('error occurred:',err)
        } else {
            //res.send(results);
            console.log('values:',values);
            res.redirect('/community/'+commName+'/'+id);
        }
    });
});


/**
 * INSERT COMMENT Reply
 */
router.post('/:communityName/:rid/insert_comments_reply/:cid', function(req, res, next) {
    //res.send("add reply");
    console.log(req.params.cid);
    var commName = req.params.communityName;
    var id = req.params.rid;
    var toId = req.params.cid;
    var user_id = req.user[0].user_id;
    var reply = req.body.commentsReply;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var query = 'INSERT INTO `test_table_comments_reply` (`user_id`, `to_id`,`reply`,`date`,`test_table_id`) VALUES ?';
    var values = [
        [user_id, toId, reply , date,id ]
    ];
    db.query(query, [values], function(err,results){
        if(err){
            console.log('error occurred:',err)
        } else {
            //res.send(results);
            console.log('values:',values);
            res.redirect('/community/'+commName+'/'+id);
        }
    });
});


/**
 * delete_comments
 */

router.post('/:communityName/:rid/delete_comments', function(req, res, next) {
    var commName = req.params.communityName;
    var id = req.params.rid;
    var user_id = req.user.user_id;
    var comments = req.body.comments;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var query = 'INSERT INTO `test_table_comments` (`user_id`, `comments`,`date`,`community`, `test_table_id`) VALUES ?';
    var values = [
        [user_id, comments, date, commName, id ]
    ];
    db.query(query, [values], function(err,results){
        if(err){
            console.log('error occurred:',err)
        } else {
            //res.send(results);
            res.redirect('/community/'+commName+'/'+id);
        }
    });
});
module.exports = router;


