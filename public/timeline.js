const dburl = "http://localhost:5001";

function laodEvents() {
    $('#events').empty();
    $.ajax({
        url: dburl + "timeline/getAllEvents",
        type: "get",
        sucess: (r) => {
            for(i = 0; i< r.length; i ++){
                let id = r[i]["_id"];
                $('#events').append(
                    `
                    <div class="event" id="${id}>
                    ${r[i].ext}
                    <span class="eventtime">${r[i].time}<span>
                    <span class="counter">${r[i].hits}<span>
                    <button class="deletebutton" onclick=deleteEvent('${id}')<button>
                    </div>
                    `
                )
            }
        }
    })
}

var time = new Date();

function profilechecked(data) {
    $.ajax({
        url: `/timeline/insert`,
        type: "put",
        data: {
            text: `${data.name} viewed`,
            time: time.toLocaleTimeStringm
         },
         sucess: (data) => {
             laodEvents;
         }
    })
}

function deleteEvent() {
    $.ajax({
        url: `/timeline/remove/${id}`,
        type: "GET",
        sucess: ()=> {
            laodEvents();
        }
    })
}

function setup() {
    laodEvents();
}
$(document).ready(setup);