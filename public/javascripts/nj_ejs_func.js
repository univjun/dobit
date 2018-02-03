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



$("#showReply").click(function(){
    $("#reply").show();
    $(this.parentNode).hide();
});
$("#hideReply").click(function(){
    $(this.parentNode).hide();
    $("#comments_control_part").show();
});

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});