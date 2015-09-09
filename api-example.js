var subjectCode = 'ABCD'; //However you are getting the subject code, put it here
var courseCode = '1234'; //However you are getting the course code, put it here
var ccAPICall = 'https://courses.newschool.edu/api/' + subjectCode + courseCode; //Build URL for the Course Catalog Query

$.getJSON(ccAPICall, function() { }).done(function(data){ //jQuery dependent getJSON call
  //--- Any of the root course data can be queried here
  console.log(data.SUBJ_DESC);
  //--- Section specific querying begins here
  var ccDayHourArray = []; //Creating arrays to house the data we will push into later
  var ccLocationArray = []; //...same
  var ccInstructorArray = []; //...more of the same
  //loop through the sections
  $.each(data.vix_sections, function(secKey, secVal) {
    // Handle time and date
    $.each(secVal.vix_section_meeting_times, function(subsecKey, subsecVal) {
      //--- Day of the Week Transform
      if (subsecVal.MONDAY_IND === 'M') {
         ccMonday = 'Mon ';} else {  ccMonday = '';}
      if (subsecVal.TUESDAY_IND === 'T') {
         ccTuesday = 'Tues ';} else {  ccTuesday = '';}
      if (subsecVal.WEDNESDAY_IND === 'W') {
         ccWednesday = 'Wed ';} else {  ccWednesday = '';}
      if (subsecVal.THURSDAY_IND === 'R') {
         ccThursday = 'Thurs ';} else {  ccThursday = '';}
      if (subsecVal.FRIDAY_IND === 'F') {
         ccFriday = 'Fri ';} else {  ccFriday = '';}
      if (subsecVal.SATURDAY_IND === 'S') {
         ccSaturday = 'Sat ';} else {  ccSaturday = '';}
      if (subsecVal.SUNDAY_IND === 'Su') {
         ccSunday = 'Sun ';} else {  ccSunday = '';}
      var ccDayCode = ccMonday + ccTuesday + ccWednesday + ccThursday + ccFriday + ccSaturday + ccSunday;
      //--- End Day of the Week Transform
      //--- Time Tranform
      var begin = subsecVal.BEGIN_TIME;
      var hours24 = parseInt(begin.substring(0,2),10);
      var hours = ((hours24 + 11) % 12) + 1;
      var amPm = hours24 > 11 ? ' p.m.' : ' a.m.';
      var minutes = begin.substring(2);
      ccHourCode = hours + ':' + minutes + amPm;
      //--- End Time Transform
      var ccLocationCode = subsecVal.BUILDING_DESC;
      var ccRoomCode = subsecVal.ROOM;
      ccDayHourArray.push("<i class=\"fa fa-calendar-o\"></i> " + ccDayCode + "<br /><i class=\"fa fa-clock-o\"></i> " + ccHourCode + "<br />");
      ccLocationArray.push("<i class=\"fa fa-building\"></i> " + ccLocationCode + "<br />Room: " + ccRoomCode + "<br />");
    });
    var ccInstructorCode = secVal.INSTRUCTOR_PRIM;
    ccInstructorArray.push(ccInstructorCode + ' ');
  });
//--- you can use the section arrays above any way you want now. I am using them to push the content into divs with #ids.
  $("<div/>", { 
    class: "cc-location", 
    html: ccLocationArray.join( "" )
  }).appendTo("#ccLocationId");

  $( "<div/>", { 
    class: "cc-day-hour", 
    html: ccDayHourArray.join( "" ) 
  }).appendTo( "#ccDayHourId" + sectionCodeSIS );

  $( "<div/>", { 
    class: "cc-instructor", 
    html: ccInstructorArray.join( "" ) 
  }).appendTo( "#ccInstructorId" + sectionCodeSIS );
  
}).fail(function(){ }).done(function() { }); //can put stuff here for failure or when the call ends
