
function loadEvents() {
    $('#events').empty();
    $.ajax({
        url: "http://localhost:5000/timeline/getAllEvents",
        type: "get",
        success: (r) => {
            for(i = 0; i < r.length; i ++){
                console.log(r[i].text);
                let id = r[i]["_id"];
                $('#events').append(
                    `
                    <div class="event" id="${id}>
                    <span class="eventtime">${r[i].time}<span>
                    <span class="counter">${r[i].hits}<span>
                    <span>${r[i].text}<span>
                    <button class="deletebutton" onclick=deleteEvent('${id}')<button>
                    </div>
                    `
                )
            }
        }
    })
}

var time = new Date();

function profilechecked(pokemonName) {
    $.ajax({
        url: `/timeline/insert`,
        type: "POST",
        data: {
            text: `${pokemonName} viewed`,
            time: time.toLocaleTimeString(),
            hits: 1
         },
         success: (data) => {
            // console.log(data);
            loadEvents();
         }
    })
}

function deleteEvent(id) {
    $.ajax({
        url: `/timeline/remove/${id}`,
        type: "GET",
        success: ()=> {
            loadEvents();
        }
    })
}

function clearEvents() {
    $.ajax({
        url: `/timeline/removeAll`,
        type: "GET",
        success: () => {
            loadEvents();
        }
    })
}

function setup() {
    loadEvents();
}
$(document).ready(setup);