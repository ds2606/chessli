// ajax to get Lichess imported game URL from chess.com username
$(document).ready(function(){
    $(".submit").click(function(){
        let userfield = document.getElementById("username");
        if (userfield.value) {
            $.get("/returnAJAX?username=" + userfield.value, function(data, status){
                $("#url-textbox").html(data);
            });
        } else {
            $("#url-textbox").html('no input');
        }
    });
});
