function getPolls() {
  var apiLink = "http://127.0.0.1:8080/api/polls/";
  $.getJSON(apiLink, function(poll){
   for (var i = 0; i < poll.length; i++) {
     $("#all-polls").append("<h2><a href='/polls/"+poll[i]['_id']+"'>"+poll[i]['question']+"</a></h2>");
   }
  });
}

$(document).ready(function() {
  getPolls();
});
