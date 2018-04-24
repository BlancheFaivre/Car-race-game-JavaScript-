window.onload = init;


// This line is a trick to initialize the AudioContext and will work on all recent browsers
var audioCtx = window.AudioContext || window.webKitAudioContext;

var canvas2;
var audioContext;       // Initialisation de la variable de l'audio
var canvasContext;
var analyser;
var width, height;
var mediaElement;
var sourceNode;

var dataAsrray, bufferLenght;
let collision = false;
let stop_partie = false;
let pause_partie = false;
let cpt_tours = 0;
let x_explosion = 0;
let y_explosion = 0;
let cpt = 0;
let canvas, ctx;
let score = 0;
let nb_voitures_gagnees = 0;
let voitures = [];
let voitures_bonus = [];
let x_ennemi, y_ennemi;
let niveau = 0;


function my_function(){
	window.location.reload();
}

function pause_function(){
	var text = document.getElementById("pause_btn").firstChild;
	text.data = text.data == "Pause" ? "Play" : "Pause";
	
	var buttons = document.getElementById("pause_btn");
	
	if (document.getElementById("pause_btn").value == "pause"){
		buttons.innerHTML = '<img src="play.png" width="50" height="50"/>';
		document.getElementById("pause_btn").value = "play";
	}
	else {
		buttons.innerHTML = '<img src="pause.png" width="50" height="50"/>';
		document.getElementById("pause_btn").value = "pause";
	}
	
	if (!pause_partie){
		mediaElement.pause();
	}
	else {
		mediaElement.play();
	}
	pause_partie = !pause_partie;
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
  
  
  bonus = new Voiture(50, 50, 0, 0, 0, 'black');
  bonus.vitesseY = 3;
  voitures_bonus.push(bonus);
  
  joueur = new Voiture(370, 500, 0, 0, 0,'black');
  
  // Ecouteurs de clavier
  window.onkeydown = traiteKeydown;
  window.onkeyup = traiteKeyup;

  // on demarre l'animation
  requestAnimationFrame(animation);
}
