$(document).ready(function(){
 	console.log("ready");

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC18VyMRO7nlPot3iz3rmZ0J4k_0zMS3no",
    authDomain: "train-time-2bf72.firebaseapp.com",
    databaseURL: "https://train-time-2bf72.firebaseio.com",
    projectId: "train-time-2bf72",
    storageBucket: "",
    messagingSenderId: "664072783607"
  };
  firebase.initializeApp(config);




var db = firebase.database();

var currentTime = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));



$("#submitButton").on("click", function(){
	console.log("submit button working");
	event.preventDefault();
	var trainName = $("#add-train").val().trim();
	var destination= $("#destination").val();
	var firstTrain = $("#firstTrain").val();
	var frequency = $("#frequency").val();

	db.ref("/schedule").push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});
});


db.ref("schedule").on("child_added", function(snapshot){
	var data = snapshot.val();
	console.log(snapshot.val());
	var frequency = data.frequency;
	console.log(data.frequency);
	var firstTime = data.firstTrain;
	console.log(data.firstTrain);
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var remainder = diffTime % frequency;
    console.log(remainder);
    var MinutesTillTrain = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);
    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("MMMM Do YYYY, h:mm:ss a"));


	$("#table-body").append(`<tr><td>${data.trainName}
		</td><td>${data.destination}
		</td><td>${data.frequency}
		</td><td>${nextTrain}
		</td><td>${MinutesTillTrain}
		</td></tr>`)
});





});