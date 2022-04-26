/*
C le code du jeu en JS qui consiste en une boucle infinie, lanc�e au chargement de la page, qui appelle la fonction game().

La fonction game() contient:
-
-
-
- rafraichit le canvas
*/

window.onload=function() {
	canv=document.getElementById("game_canvas");
	scoredisplay=document.getElementById("score");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	// boucle infinie : appelle la fonction game() toutes les 15/1000 de seconde
	setInterval(game,1000/15)
}

debug=true;
score=0;
x_position = y_position = 10;
x_speed = y_speed = 0;
x_apple = y_apple = 15;
cell_size = 30;
row_length = 20;  // number of cells in a row or a column
trail=[];
tail = 5;

function move_snake(){
	// inc position with current speed
	x_position += x_speed;
	y_position += y_speed;
	// teleport back on the other side if out of walls
	if(x_position < 0) {
		x_position = row_length - 1;
	}
	if(x_position > row_length - 1) {
		x_position = 0;
	}
	if(y_position < 0) {
		y_position = row_length-1;
	}
	if(y_position > row_length-1) {
		y_position = 0;
	}
}

function paint_canvas_background(){
	ctx.fillStyle="#3c006b";
	ctx.fillRect(0,0,canv.width,canv.height);
}
function paint_square(x, y){
	ctx.fillRect(x * cell_size, y * cell_size, cell_size-2, cell_size-2);
}

function game() {
	move_snake();
	paint_canvas_background();
	ctx.fillStyle="#d7b024";
	for(var i=0;i<trail.length;i++) {
		paint_square(trail[i].x, trail[i].y);
		if(trail[i].x==x_position && trail[i].y==y_position) {
			// if snake bite his tail, reset tail length
			tail = 5;
		}
	}

	trail.push({x:x_position,y:y_position});
	while(trail.length>tail) {
		trail.shift();
	}

	if(x_apple==x_position && y_apple==y_position) {
		tail++;
		score++;
		scoredisplay.textContent  = score;
		x_apple=Math.floor(Math.random()*row_length);
		y_apple=Math.floor(Math.random()*row_length);
	}
	
	ctx.fillStyle="red";
	paint_square(x_apple, y_apple);
}

function keyPush(evt) {
	/*
		Here we map what to do on a key press.
		It is possible to play with the arrow keys or with ZQSD.
	*/
	switch(evt.keyCode) {
		case 37: // left arrow
		case 81: // Q
			if(x_speed==0) {x_speed=-1;y_speed=0;}
			break;
		case 38: // up arrow
		case 90: // Z
			if(y_speed==0) {x_speed=0;y_speed=-1;}
			break;
		case 39: // right arrow
		case 68: // D
			if(x_speed==0) {x_speed=1;y_speed=0;}
			break;
		case 40: // down arrow
		case 83: // S
			if(y_speed==0) {x_speed=0;y_speed=1;}
			break;
		default: // debug mode, log key code for yet unmapped keys
			if(debug) { console.log(evt.keyCode); }
	}
}

function animate() {

}
/*const img = new image();
img.onload = start;
img.src = 'https://i.imgur.com/fqgm8uh.png';

function start() {
  const ctx = document.queryselector('canvas').getcontext('2d');
  
  const pattern = ctx.createpattern(img, 'repeat');

  function render(time) {
    time *= 0.001;  // seconds;
    
    ctx.clearrect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const x = math.sin(time * 1.1) * 150 + 150;
    const y = math.sin(time * 1.2) * 50 + 50;
    
    ctx.translate(x, y);
	// peindre avec le motif
    ctx.fillstyle = pattern;
	// on dessinne le carr� 
    ctx.fillrect(0, 0, 30, 40);
	// on dessinne le cercle
    ctx.beginpath();
    ctx.arc(0, 0, 25, 0, math.pi * 2);
    ctx.fill();
    
    ctx.settransform(1, 0, 0, 1, 0, 0);  // set it back to the default
    
    requestanimationframe(render);
  }
  requestanimationframe(render);
}
*/