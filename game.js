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
interval_id = undefined
headImg = new Image();
headImg.src = './BowserCastré.png';
var headPattern;

window.onload=function() {
	canv=document.getElementById("game_canvas");
	gameover=document.getElementById("game_over");
	scoredisplay=document.getElementById("score");
	finalscore=document.getElementById("end_score");
	ctx=canv.getContext("2d");
	headPattern = ctx.createPattern(headImg, 'no-repeat');
	document.addEventListener("keydown",keyPush);
	start_game();
}
function start_game(){
	// boucle infinie : appelle la fonction game() toutes les 15/1000 de seconde
	started = true;
	interval_id = setInterval(game,1000/15);
}

function stop_game(display_gameover=true){
	started = false;
	// si la boucle infinie tourne, alors on l'arrete et on affiche l'ecran game over
	if(interval_id !== undefined){
		// on arrete la boucle
		clearInterval(interval_id);
		interval_id = undefined;
		if (display_gameover) {
			// on uptade le score sur l'ecran game over
			finalscore.textContent  = score;
			// on affiche l'ecran game over
			gameover.className = "visible";
		}
	}
}

function pause_game() {
	stop_game(false);
}
unpause_game = start_game;

function bowser_coordinates(number) {
	// retourne les coordonnées d'un bowser dans le sprite des bowser 
	return [number*53, 0, 50, 50]; // [x, y, width, height]
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

function paint_head(x, y, number = 0){
	ctx.drawImage(headImg,
	...bowser_coordinates(number),
	(x-0.35) * cell_size, (y-0.35) * cell_size, cell_size*1.7, cell_size*1.7);
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

	// partie 4 : Affiche
	paint_canvas_background();
	// affiche le serpent
	paint_head(x_position, y_position); // on affiche la tete 
	ctx.fillStyle = "#d7b024";
	for(var i=0;i<tail.length;i++) { // on affiche la queue 
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
		case 27: // echap
			if (started) {
				pause_game();
			} else {
				unpause_game();
			}
		default: // debug mode, log key code for yet unmapped keys
			if(debug) { console.log(evt.keyCode); }
	}
}
