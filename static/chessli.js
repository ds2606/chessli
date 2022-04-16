// get most recent game info from backend and update view
function updateView() {
    let userfield = document.getElementById("username");
    if (userfield.value) {
        $.get("/returnAJAX?username=" + userfield.value, function(data, status){
            $("#url-textbox").html(data);
        });
        // do this without settimeout when I learn more about js
        function tmp() {$("#url-textbox").animate({opacity: 1});}
        setTimeout(tmp, 2000);
    } else {
        $("#url-textbox").animate({opacity: 0});
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
