// catch clicks for username submission
$(document).ready(function(){
    $("#submit").click(queryUsername);
});

// catch 'enter' key-presses for username submission
$(document).on("keydown", "form", function(event) {
    if ( event.which == 13 ) {  // Enter key = keycode 13
        queryUsername();
        return false;
    }
});

// get most recent game info from backend and update view
function queryUsername() {
    $("#clickbox").animate({opacity: 0});
    let userfield = document.getElementById("username");
    if (userfield.value) {
        if (rateLimitRequests()) return;
        $.get("/" + userfield.value, function(payload, status) {
            data = jQuery.parseJSON(payload)
            if (data.error) {
                // makes sure this comes after animation out, maybe see if there is
                // a way to directly wait for the first animation call to run
                // updateClickbox instead of the janky settimeout use
                setTimeout(() => {
                        updateClickbox(0, data.error, '#ff5f5f', 'none')
                    }, 1000);
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
    if (link) $("#clickbox").attr("href", data.link);
    else $("#clickbox").removeAttr("href");
    $("#clickbox").html(html)
    $('#clickbox').css({'color': color, 'pointer-events': pointerevents});
    $("#clickbox").animate({opacity: 1});
}

// Rate limit user requests. This would be more robust if checked on the backend so user
// can't just disable JS and then spam.
let job_running = 0;
function rateLimitRequests() {
    // manage global tracker for requests
    if (job_running) return true;
    job_running = 1;

    // disable submits for duration of job
    submit_btn = document.getElementById("submit");
    submit_btn.disabled = true;
    submit_btn.style.pointerEvents = "none";

    // restore submits after job is completed
    setTimeout(() => {
        job_running = 0;
        submit_btn.disabled = false;
        submit_btn.style.pointerEvents = "auto";
    }, 5000);
    return false;
}
