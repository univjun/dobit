//var db = require('../db/mysql_db');

function showReplyTextArea(id) {
    var x = document.getElementById(id);

    if(x.style.display === "none"){
        x.style.display = "block";
        this.parentNode.style.display = "none";
    } else {
        x.style.display = "none";
        this.parentNode.style.display = "block";
    }
}


//
// $(".showReply").click(function(){
//     $(".replyInputPart").show();
//     $(".replyControlPart").hide();
// });
// $(".hideReply").click(function(){
//     $(".replyInputPart").hide();
//     $(".replyControlPart").show();
// });
//
//
function toggleReply(j){
    var x = document.getElementById('reply'+j);
    var y = document.getElementById('comments_reply_control_part'+j);
    if(x.style.display === 'none') {
        x.style.display = 'block';
        y.style.display = 'none';
    } else {
        x.style.display = 'none';
        y.style.display = 'block';
    }
}

function toggleComments(i){
    var x = document.getElementById('comments'+i);
    var y = document.getElementById('comments_control_part'+i);
    if(x.style.display === 'none') {
        x.style.display = 'block';
        y.style.display = 'none';
    } else {
        x.style.display = 'none';
        y.style.display = 'block';
    }
}

function needLogin(user){
    if(!user){
        document.getElementById('id01').style.display='block';
    }
}



// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


function createFromMysql(mysql_string){
    var t, result = null;

    if( typeof mysql_string === 'string' )
    {
        t = mysql_string.split(/[- :]/);

        //when t[3], t[4] and t[5] are missing they defaults to zero
        result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
    }

    return result;
}

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});