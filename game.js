/*
C le code du jeu en JS qui consiste en une boucle infinie, lanc? au chargement de la page, qui appelle la fonction game().

La fonction game() contient:
-
-
-
- rafraichit le canvas
*/

debug = true;
started = false;
score = 0;
x_position = y_position = 10;
x_speed = 1;
y_speed = 0;
x_apple = y_apple = 15;
cell_size = 30;
row_length = 20;  // number of cells in a row or a column
tail = [];
tail_length = 5;
interval_id = undefined;

window.onload=function() {
	canv=document.getElementById("game_canvas");
	gameover=document.getElementById("game_over");
	scoredisplay=document.getElementById("score");
	finalscore=document.getElementById("end_score");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	start_game();
}

function start_game(){
	// boucle infinie : appelle la fonction game() toutes les 15/1000 de seconde
	started = true;
	interval_id = setInterval(game,1000/15);
}

function stop_game(){
	// si la boucle infinie tourne, alors on l'arrete et on affiche l'ecran game over
	if(interval_id !== undefined){
		// on arrete la boucle
		clearInterval(interval_id);
		interval_id = undefined;
		// on uptade le score sur l'ecran game over
		finalscore.textContent  = score;
		// on affiche l'ecran game over
		gameover.className = "visible";
	}
}

function move_snake(){
	// move tail
	tail.push({x:x_position,y:y_position});
	while(tail.length > tail_length) {
		tail.shift();
	}

	// move head
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
	// partie 1 : avancer le serpent
	move_snake();

	// partie 2 : mange-t-il une pomme ?
	if(x_apple==x_position && y_apple==y_position) {
		// Oui, on augmente le score
		tail_length++;
		score++;
		scoredisplay.textContent  = score;
		// On génère une nouvelle pomme
		x_apple=Math.floor(Math.random()*row_length);
		y_apple=Math.floor(Math.random()*row_length);
	}

	// partie 3 : mange-t-il sa queue ?
	for(var i=0; i < tail.length; i++) {
		if(tail[i].x==x_position && tail[i].y==y_position) {
			// si le serpent mange sa queue, on arrête le jeu !
			 stop_game();
		}
	}

	// partie 4 : Render
	paint_canvas_background();
	// affiche le serpent
	ctx.fillStyle="#d7b024";
	for(var i=0;i<tail.length;i++) {
		paint_square(tail[i].x, tail[i].y);
	}
	// affiche la pomme
	ctx.fillStyle="red";
	paint_square(x_apple, y_apple);
}


/*
	Key Bindings
*/

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
	// on dessinne le carr? 
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

