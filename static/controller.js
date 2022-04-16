// get most recent game info from backend and update view
function updateView() {
    $("#clickbox").animate({opacity: 0});
    let userfield = document.getElementById("username");
    if (userfield.value) {
        $.get("/returnAJAX?username=" + userfield.value, function(payload, status){
            data = jQuery.parseJSON(payload)
            if (data.error) {
                $("#clickbox").html('user not found');
                $('#clickbox').css('color', '#ff5f5f');
                $("#clickbox").css("pointer-events", "none")
            } else {
                $("#clickbox").attr("href", data.link)
                $("#clickbox").html(data.white + ' vs ' + data.black);
                $('#clickbox').css('color', '#5fd787');
                $("#clickbox").css("pointer-events", "auto")
            }
            $("#clickbox").animate({opacity: 1});
        });
        // do this without settimeout when I learn more about js
    } else {
        setTimeout(() => { $("#clickbox").html('&nbsp;'); }, 500)
        $("#clickbox").css("pointer-events", "none")
    }
}

$(document).ready(function(){
    $(".submit").click(updateView);
});

// catch 'enter' key-presses
$(document).on("keydown", "form", function(event) {
    if ( event.which == 13 ) // Enter key = keycode 13
    {
        updateView();
        $("#username").val('');
        return false;
    }
});
