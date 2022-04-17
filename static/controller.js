$(document).ready(function(){
    $(".submit").click(queryUsername);
});

// catch 'enter' key-presses
$(document).on("keydown", "form", function(event) {
    if ( event.which == 13 ) // Enter key = keycode 13
    {
        queryUsername();
        // $("#username").val('');
        return false;
    }
});

// get most recent game info from backend and update view
function queryUsername() {
    $("#clickbox").animate({opacity: 0});
    let userfield = document.getElementById("username");
    if (userfield.value) {
        $.get("/returnAJAX?username=" + userfield.value, function(payload, status){
            data = jQuery.parseJSON(payload)
            if (data.error) {
                setTimeout(() => {
                    // makes sure this comes after animation out, maybe see if there is
                    // a way to directly wait for the first animation call to run
                    // updateClickbox instead of the janky settimeout use
                    updateClickbox(0, data.error, '#ff5f5f', 'none')
                    }, 500);
            } else {
                let html = data.white + ' vs ' + data.black;
                updateClickbox(data.link, html, '#5fd787', 'auto')
            }
        });
    } else {
        setTimeout(() => { $("#clickbox").html('&nbsp;'); }, 500)
        $("#clickbox").css("pointer-events", "none")
    }
}

function updateClickbox(link, html, color, pointerevents) {
    if (link) { $("#clickbox").attr("href", data.link); console.log(link); }
    else { $("#clickbox").removeAttr("href"); console.log('wfwqfqewf') }
    $("#clickbox").html(html)
    $('#clickbox').css('color', color);
    $("#clickbox").css("pointer-events", pointerevents);
    $("#clickbox").animate({opacity: 1});
}

