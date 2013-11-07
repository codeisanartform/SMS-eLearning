console.log('HEY BRAD!');

var flashReady = function(){
	$( "#play" ).click(function() {
		alert( "ALERT!!!" );
		flash.connect();
  	});
}

var connected = function(success,error){
	flash.playPause();
	
}

