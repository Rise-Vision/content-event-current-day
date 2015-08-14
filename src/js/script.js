

//set the clock
// var today = new Date();
// var year,
// 	month,
// 	weekday;

// function startTime() {
//     var hours = today.getHours();
//     var minutes = today.getMinutes();
//     var ampm = ' pm';
//     minutes = checkTime(minutes);

//     if (hours < 12){
//     	ampm = ' am';
//     }
//     if (hours > 12){
//     	hours -=12;
//     }
//     if (hours < 10){
//     	hours = ' ' + hours;
//     }
//     document.getElementById('clock').innerHTML = hours + ':' + minutes + ampm;
//     var t = setTimeout(function(){startTime()},500);
// }
// function checkTime(i) {
//     if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
//     return i;
// }


$(document).ready(function(){

//set the clock

var year,
	month,
	dayOfMonth,
	weekday;

function startTime() {
	showDate();
	var today = new Date();
    var hours = today.getHours();
    // hours = checkHours(hours);
    var minutes = today.getMinutes();
    minutes = checkMinutes(minutes);
    var ampm = "pm";
    if (hours < 12){
    	ampm = "am";
    }
    if (hours > 12){
    	hours -=12;
    	// checkHours(hours);
    }
    if (hours < 10){
    	hours = "0" + hours;
    }

    // document.getElementById('clock').innerHTML = hours + ':' + minutes + ampm;
    setTimeout(function(){startTime();},500);
}

function checkMinutes(i) {
    if (i<10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
}

/*function checkHours(j) {
    if (j<10) {j = "0" + j;}  // add zero in front of numbers < 10
    return j;
}*/

function showDate(){
	var date = new Date();
	year = date.getYear();
	if (year < 1000) {
		year += 1900;
	}
	$("#year").text(year);
	var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	month = monthsArray[date.getMonth()];
	$("#month").text(month);
	dayOfMonth = date.getDate();
	$("#dayOfMonth").text(dayOfMonth);
	var daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	weekday = daysArray[date.getDay()];
	$("#weekday").text(weekday);
}





//start the timer
window.onload = function() {
  startTime();
};

// set the date for display
//var d = new Date();
// document.getElementById("date").innerHTML = d.toDateString();

});
