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

var missile_lance = false;
var dataAsrray, bufferLenght;
let collision = false;
let stop_partie = false;
let pause_partie = false;
let cpt_tours = 0;
let x_explosion = 0;
let y_explosion = 0;
let nb_voitures_rouges_tuees = 0;
let cpt = 0;
let canvas, ctx;
let ctx_nv;
let score = 0;
let nb_voitures_gagnees = 10;
let nb_vies = 3;
let voitures = [];
let voitures_bonus = [];
let missiles = [];
let x_ennemi, y_ennemi;
let x_bonus, y_bonus;
let niveau = 0;
let frequence_envoi_ennemis = 700;
let frequence_envoi_bonus = 3000;
let go_fin = false;
let joueur_appuye_sur_commencer = false;
let afficher_entrer = true;
let afficher_entrer_fin = true;
let vies = [];
let frequence_envoi_vie = 2000;
let x_vie, y_vie;



function my_function(){
	window.location.reload();
}

function pause_function(){
	console.log("pause");
	var text = document.getElementById("pause_btn").firstChild;
	text.data = text.data == "Pause" ? "Play" : "Pause";

	var buttons = document.getElementById("pause_btn");

	if (document.getElementById("pause_btn").value == "pause"){
		buttons.innerHTML = '<img src="images/play.png" width="50" height="50"/>';
		document.getElementById("pause_btn").value = "play";
	}
	else {
		buttons.innerHTML = '<img src="images/pause.png" width="50" height="50"/>';
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
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

// main.js
function init() {
  console.log("page chargee");
  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
	canvas2 = document.querySelector("#my_music_canvas");
	canvas_fin = document.querySelector("#myCanvas");

  // 2 On recupere le contexte graphique pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");
	ctx_nv = canvas2.getContext("2d");
	ctx_fin = canvas_fin.getContext("2d");

  // Gestion SoundWave
	onLoadSoundWave();

  ennemi = new Voiture(200, 50, 0, 0, 0, 'black', 0);
  ennemi.vitesseY = 3;
  voitures.push(ennemi);


  bonus = new Voiture(50, 50, 0, 0, 0, 'black', 0);
  bonus.vitesseY = 3;
  voitures_bonus.push(bonus);

  joueur = new Voiture(370, 500, 0, 0, 0,'black', 0);

  vie = new Voiture(50, 50, 0, 0, 0, 'red', 0);
  vie.vitesseY = 0.5;
  vies.push(vie);

  // Ecouteurs de clavier
  window.onkeydown = traiteKeydown;
  window.onkeyup = traiteKeyup;

  // on demarre l'animation
  requestAnimationFrame(animation);
}
