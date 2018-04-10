window.onload = init;

let canvas, ctx;
let cpt_x = 5, cpt_y = -2;
let voitures = [];

function my_function(){
	window.location.reload();
}

//********************* INIT ***********************
function init(){
	//Chargement
	console.log("page chargee");
	
	//Récupération du contexte graphique
	canvas = document.querySelector("#myCanvas");
	ctx = canvas.getContext("2d");
	var width_canvas = canvas.width;
	var height_canvas = canvas.height;
	
	//Ecouteurs de clavier
	window.onekeydown = traiteKeydown;
	window.onkeyup = traiteKeyup;
	
	//Dessin du joueur
	joueur = new Voiture(width_canvas / 2,height_canvas,30,30, 'red');
	joueur.vitesseX = 0;
	joueur.vitesseY = 5;
	
	voitures.push(joueur);
	
	//Demarrage de l'animation
	requestAnimationFrame(animation);
}

  
  


