
// This line is a trick to initialize the AudioContext and will work on all recent browsers
var audioCtx = window.AudioContext || window.webKitAudioContext;

var canvas;
var audioContext;       // Initialisation de la variable de l'audio
var canvasContext;
var analyser;
var width, height;

var dataArray, bufferLenght;

window.onload = function() {
    audioContext = new audioCtx(); // Crée et retourne un nouvel AudioContext object

    canvas = document.querySelector("#myCanvas");
    width = canvas.width;
    height = 100;
    canvasContext = canvas.getContext('2d');

    buildAudioGraph();

    requestAnimationFrame(visualize);

}

function buildAudioGraph() {
    var mediaElement = document.getElementById('player');  // Récuperer la chan
    var sourceNode = audioContext.createMediaElementSource(mediaElement);

    analyser = audioContext.createAnalyser();   // Pour créer un noeud d'analyse

    // Définissons les options du visualizer
    analyser.fftSize = 1024; // On pourrait choisir 512 pour une basse précision
    bufferLenght = analyser.frequencyBinCount;  // Nombre de valeurs à manipuler pour la visualisation. Equivalent à la moitié de la taille de la FFT
    dataArray = new Uint8Array(bufferLenght);   // Tableau d'entiers non signé

    sourceNode.connect(analyser);   // Connecter 
    analyser.connect(audioContext.destination);
}

function visualize(){
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.fillStyle = 'rgba(0, 0, 5, 2)';
    canvasContext.fillRect(0, 0, width, height);

    analyser.getByteTimeDomainData(dataArray);  // Pour copier les données de forme d'onde ou du domaine temporel dans dataArray

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'purple';

    // all the waveform is in one single path, first let's
  // clear any previous path that could be in the buffer
  canvasContext.beginPath();
  
  var sliceWidth = width / bufferLenght;
  var x = 0;

  for(var i = 0; i < bufferLenght; i++) {
     // normalize the value, now between 0 and 1
     var v = dataArray[i] / 255;
    
     // We draw from y=0 to height
     var y = v * height;

     if(i === 0) {
        canvasContext.moveTo(x, y);
     } else {
        canvasContext.lineTo(x, y);
     }

     x += sliceWidth;
  }

  canvasContext.lineTo(canvas.width, 50);
  
  // draw the path at once
  canvasContext.stroke();  
  
  // call again the visualize function at 60 frames/s
  requestAnimationFrame(visualize);     // On va l'enlever par la suite et rajouter à la boucle d'animation
  
}