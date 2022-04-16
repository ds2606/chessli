// get most recent game info from backend and update view
function updateView() {
    $("#url-textbox").animate({opacity: 0});
    let userfield = document.getElementById("username");
    if (userfield.value) {
        $.get("/returnAJAX?username=" + userfield.value, function(payload, status){
            data = jQuery.parseJSON(payload)
            if (data.error) {
                $("#url-textbox").html('user not found');
                $('#url-textbox').css('color', '#ff5f5f');
            } else {
                $("#url-textbox").html(
                    '<a class="hover-2" href=' + data.link + '>'
                    + data.white + ' vs ' + data.black
                    + '</a>'
                );
                $('#url-textbox').css('color', '#5fd787');
            }
            $("#url-textbox").animate({opacity: 1});
        });
        // do this without settimeout when I learn more about js
    } else {
        setTimeout(() => { $("#url-textbox").html('&nbsp;'); }, 500)
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
