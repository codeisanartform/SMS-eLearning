$( "#stop" ).click(function() {
	/* alert( "ALERT!!!" ); */
	flash.stopPlaying();
});

var getDuration = function(duration){
	console.log(duration);
}

var flashReady = function(){
	$( "#play" ).click(function() {
		alert( "ALERT!!!" );
		flash.connect("rtmp://localhost/SMServer");
		console.log("HOLLA");
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