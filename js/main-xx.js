var streamingVideos = [];
streamingVideos = ["hobbit_vp6.flv", ];

$( "#stop" ).click(function() {
	/* alert( "ALERT!!!" ); */
	flash.stopPlaying();
});

var setVideoTime = function(time){
	console.log("ADD THIS");
	var videoTimeTag = document.getElementById("#duration");
	videoTimeTag.innerHTML("ADD THIS");
}

var getDuration = function(duration){
	console.log(duration);
	setVideoTime(duration);
}

var flashReady = function(){
	$( "#play" ).click(function() {
		//alert( "ALERT!!!" );
		flash.connect("rtmp://localhost/SMServer");
		//console.log("HOLLA");
  	});
  	
  	$( "#pause" ).click(function() {
		/* alert( "ALERT!!!" ); */
		flash.playPause();
	});
}

var connected = function(success,error){
	flash.startPlaying("hobbit_vp6.flv");
	//currentTime();
	//totalTime();
	/* console.info(success); */
}