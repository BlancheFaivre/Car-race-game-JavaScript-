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


// main.js
function init() {
  console.log("page chargee");
  
  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  
  // 2 On recupere le contexte graphique pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");

  // Gestion SoundWave
	onLoadSoundWave();
  
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
