window.onload = init;

let collision = false;
let stop_partie = false;
let cpt_tours = 0;
let x_explosion = 0;
let y_explosion = 0;
let cpt = 0;
let canvas, ctx;
let score = 0;
let nb_voitures_gagnees = 0;
let voitures = [];
let voitures_bonus = [];


function my_function(){
	window.location.reload();
}

<<<<<<< HEAD

=======
>>>>>>> 85f659596a9ce45a75269c61f2abb70470dae2d7
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
  
  bonus = new Voiture(50, 50, 0, 0, 0, 'black');
  bonus.vitesseY = 3;
  voitures_bonus.push(bonus);
  
  joueur = new Voiture(370, 500, 0, 0, 0,'black');
  
  // Gestion SoundWave
	onLoadSoundWave();
  // Ecouteurs de clavier
  window.onkeydown = traiteKeydown;
  window.onkeyup = traiteKeyup;

  // on demarre l'animation
  requestAnimationFrame(animation);
}
