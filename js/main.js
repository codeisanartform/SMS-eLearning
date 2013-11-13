var videoDuration;
var timeStamp;
var getVolume;
var position_percentage;
var record = $("#record");
var recording = false;
var microphoneList = $("#microphoneList");
var cameraList = $("#cameraList");

/* RECORDING */
record.click(function(){
	console.log("RECORDING!!!");
	
	if(!recording){
		flash.startRecording("movie", 0,0);
		recording = true;
	} else {
		flash.stopRecording();
		recording = false;
	}
});

var streamingVideos = [];
streamingVideos = ["hobbit_vp6.flv", ];

var getDuration = function(duration){
	console.log(duration);
	videoDuration = duration;
}

var flashReady = function(){
		
	$( "#play" ).click(function() {
		flash.connect("rtmp://localhost/SMServer");
	});
  	
  	$( "#pause" ).click(function() {
		flash.playPause();
	});
	
	$("#mircophone").click(function(){
		microphoneList.css("display","block");
		cameraList.css("display","none");
		console.log("MIC!!!");
		microphones = flash.getMicrophones();
		microphoneList.html('<li>'+ microphones +'</li>');
	});
	
	$("#camera").click(function(){
		cameraList.css("display","block");
		microphoneList.css("display","none");
		console.log("CAM!!!");
		cameras = flash.getCameras();
		cameraList.html('<li>'+ cameras +'</li>');
	});
}

var connected = function(success,error){
	flash.startPlaying("hobbit_vp6.flv");
	
	getVolume = flash.getVolume();
	
	volumeStamp = getVolume;
	positionPercentage = volumeStamp / 1;
	$("volume_slider").css('left', Math.floor(positionPercentage * $("volume_bar").width() ));
}

var seekTime = function(time) {
	/*
	var currentMin = Math.floor(time / 60);
	var currentSec = Math.floor(time % 60); 
	*/
	timeStamp = time;
	position_percentage = timeStamp / videoDuration;
	//console.log(position_percentage, $(".scrubber").width());
	
	$(".seeker").css("left", Math.floor(position_percentage * $(".scrubber").width()));
}

$(".scrubber").on("mousedown", function(e){	
	var left = e.pageX - $(this).offset().left;
	var newSeekTime = left / $(".scrubber ").width();
	var time = newSeekTime * videoDuration; 
	$('.seeker').css('left', left);
	//console.log(time);
	flash.setTime(time);
});

