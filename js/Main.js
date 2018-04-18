window.onload = init;

let collision = false;
let x_explosion = 0;
let y_explosion = 0;
let cpt = 0;
let canvas, ctx;
let voitures = [];


function my_function(){
	window.location.reload();
}

<<<<<<< HEAD
//********************* INIT ***********************
function init(){
	//Chargement
	console.log("page chargee");
	
	//Récupération du contexte graphique
	canvas = document.querySelector("#myCanvas");
	ctx = canvas.getContext("2d");
	var width_canvas = canvas.width;
	var height_canvas = canvas.height;
	
	// Gestion SoundWave
	onLoadSoundWave();
	//Ecouteurs de clavier
	window.onekeydown = traiteKeydown;
	window.onkeyup = traiteKeyup;
	
	//Dessin du joueur
	joueur = new Voiture(width_canvas / 2,height_canvas,30,30, 'red');
	joueur.vitesseX = 0;
	joueur.vitesseY = 5;
	
	//canvas.getContext('2d').putImageData(data, 0, 0);
	
	voitures.push(joueur);
	
	//Demarrage de l'animation
	requestAnimationFrame(animation);
}
  
=======
>>>>>>> f2451d2bf2b73ece80c70f95ea5066b51c71c262

// main.js
function init() {
  console.log("page chargee");
  
  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  
  // 2 On recupere le contexte graphique pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");
  
  ennemi = new Voiture(200, 50, 0, 0, 0, 'black');
  ennemi.vitesseY = 3;
  voitures.push(ennemi);
  joueur = new Voiture(370, 500, 0, 0, 0,'black');
  
  // Ecouteurs de clavier
  window.onkeydown = traiteKeydown;
  window.onkeyup = traiteKeyup;

  // on demarre l'animation
  requestAnimationFrame(animation);
}
