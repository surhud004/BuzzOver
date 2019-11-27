var mouseFlag = 0;//flag counter to check init location of mouse pointer
window.onload = function(){
	mouseFlag = 0;
	document.body.scrollTop = 0;//always scroll to top of page
  	document.documentElement.scrollTop = 0;
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var img = new Image();
    img.src = 'assets/bkg.png';
    context.drawImage(img, 10, 1);//draw image on canvas at (10,1)
    checkMousePosition();
};

function checkMousePosition() {
	$('#myCanvas').mousemove(function(e){
    var x = e.pageX - $(this).offset().left;//get relative X coordinate
    var y = e.pageY - $(this).offset().top;//get relative Y coordinate (relative to canvas)
    var coordinate = "x=" + x + ", y=" + y;
    console.log(coordinate);//get coordinates and check if mouse is in place first
		if(x > 10) {
			if(mouseFlag === 0) {
				alert("Place mouse at beginning of pipe and hit Enter!! Don't click OK!");				
			}
		} else if(x <= 10) {//set flag = 1 as mouse is in place and start the game
			mouseFlag = 1;
			startGame();
		}
	});
}

function startGame() {
	$('#myCanvas').mousemove(function(e){
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    var coordinate = "x=" + x + ", y=" + y;
    console.log(coordinate);
	var canvas = this.getContext('2d');
	var p = canvas.getImageData(x, y, 1, 1).data;//p contains the image data like rgb values are in p[0], p[1], p[2] resp.
	console.log(p[3]);//p[3] contains alpha value, alpha = 0 transparent, alpha = 255 opaque
	if(p[3] === 255) {//alpha 255 = opaque = line touched
		$('#overlay').css("display", "block");
		$('#text').text("Game Over!!");
		document.getElementById("myAudio").play();
	}
	if(y <= 26 || y >= 670) {//if user trying to escape from outside of pipe
		$('#overlay').css("display", "block");
		$('#text').text("No Cheating!!");
		document.getElementById("myAudio").play();
	}
	if(x >= 1340) {//if user reaches the other end of pipe
		$('#overlay').css("display", "block");
		$('#text').text("You Win!!").toggleClass("done");
		$('#exit').toggleClass("done");
		document.getElementById("myAudioWin").play();
	}
	});
}