// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = mm + '/' + dd + '/' + yyyy;
// document.write(today);

// var getDate = document.getElementById("getDate");



// // getDate.on( "click", function(){
// //     // $("calendar").add("<h1>"+ today+"<h1>")
// //     document.getElementsByClassName("calendar").addHtml
// // } );


// $("#getDate").click(function(){
//     $(".calendar").append("<h1>"+ today+"</h1>");
//   });
  

// document.getElementsByClassName(".calendar").in



// function getDatesBetween(dat1, date2)
// {

// }



 var marchEvents = [
    {
      title: 'Pool Part for seniors',
      start: '2022-03-01'
    },
    {
      title: 'BBQ week',
      start: '2022-03-07',
      end: '2022-03-10'
    },
    {
      groupId: '999',
      title: 'Classes to learn tiktok for seniors',
      start: '2022-03-09T16:00:00'
    },
    {
      groupId: '999',
      title: 'Movie Time for seniors',
      start: '2022-03-16T16:00:00'
    },
    {
      title: 'yoga for Seniors',
      start: '2022-03-11',
      end: '2022-03-13'
    },
    {
      title: 'Comunity Meeting',
      start: '2022-03-12T10:30:00',
      end: '2022-03-12T12:30:00'
    },
    {
      title: 'Lunch Free',
      start: '2022-03-12T12:00:00'
    },
    {
      title: 'tango Classes for seniors',
      start: '2022-03-12T14:30:00'
    },
    {
      title: 'Chess Tournament',
      start: '2022-03-13T07:00:00'
    },
    {
      title: 'New technologies for Seniors',
      url: 'http://google.com/',
      start: '2022-03-28'
    }
  ]


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2022-03-07',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // insert events here from database

      events: marchEvents
    });

    calendar.render();
  });