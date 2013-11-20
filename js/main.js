var videoDuration;
var timeStamp;
var getVolume;
var user;
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

/* === FIREBASE ========================= */

$("#boxscroll2").niceScroll("#contentscroll2",{cursorcolor:"#5EA020",cursoropacitymax:0.7,boxzoom:true,touchbehavior:true});  // Second scrollable DIV

var chatRef = new Firebase('https://brads-sms-chat.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, userParam) {
	user = userParam;
    console.log(user);
});

$( "#login-fb" ).click(function() {
	if(user == typeof(undefined)) {
		auth.login('facebook', {
			rememberMe: true,
			scope: 'email,user_likes'
		});
		//this.html("LOGOUT FB");
		console.log("LOGGED IN FB!", user, this);
	}else{
		auth.logout();
		//user = typeof(undefined);
		console.log("LOGGED OUT FB!", user, this);
	}
});

$( "#login-twitter" ).click(function() {
	if(user === null){
		auth.login('twitter', {
	    rememberMe: true
	    });
	    $('#nameInput').html(user.displayName);
	    $(this).html('<span class="fa fa-twitter-square"></span> LOGOUT TW');
	    console.log("LOGGED IN TWITTER!", user, this);
	}else{
		auth.logout();
		$('#nameInput').html("Please Log In");
		$(this).html('<span class="fa fa-twitter-square"></span> LOGIN TW');
		console.log("LOGGED OUT TWITTER!", user, this);
	}
	//console.log("OUT OF IF", user);
});

var myDataRef = new Firebase('https://brads-sms-chat.firebaseio.com');
$('#messageInput').keypress(function (e) {
	if (e.keyCode == 13) {
	  var name = $('#nameInput').html();
	  var text = $('#messageInput').val();
	  myDataRef.push({name: name, text: text});
	  $('#messageInput').val('');
	}
});

myDataRef.on('child_added', function(snapshot) {
	var message = snapshot.val();
	displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
	var provider = user['provider'];
	var img;
	
	if (provider == 'twitter'){
		img = "";
	}else if (provider == 'facebook') {
		img = user['profilePic'];
	}
	$('<div/>').text(text).prepend($('<strong/>').text(name+': ')).appendTo($('#messagesDiv'));
	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

