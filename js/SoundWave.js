function onLoadSoundWave() {
	if (!stop_partie) {
    audioContext = new audioCtx(); // Crée et retourne un nouvel AudioContext object

    canvas2 = document.querySelector("#my_music_canvas");
    width = canvas2.width;
    height = canvas2.height;
    canvasContext = canvas2.getContext('2d');

    buildAudioGraph();

    requestAnimationFrame(visualize);
	}
}

function buildAudioGraph() {
    mediaElement = document.getElementById('player');  // Récuperer la chan
    sourceNode = audioContext.createMediaElementSource(mediaElement);
    
    mediaElement.play();
    mediaElement.playBackRate = 0.75;

    analyser = audioContext.createAnalyser();   // Pour créer un noeud d'analyse

    // Définissons les options du visualizer
    analyser.fftSize = 1024; // On pourrait choisir 512 pour une basse précision
    bufferLenght = analyser.frequencyBinCount;  // Nombre de valeurs à manipuler pour la visualisation. Equivalent à la moitié de la taille de la FFT
    dataArray = new Uint8Array(bufferLenght);   // Tableau d'entiers non signé

    sourceNode.connect(analyser);   // Connecter 
    analyser.connect(audioContext.destination);
}

var cptColor = Math.random() * (255 - 2) + 2;
function visualize(){
	if ((!stop_partie)&&(!pause_partie)) {
    //canvasContext.clearRect(0, 0, width, 100);
    canvasContext.fillStyle = 'rgba(0, 0, 5, 2)';
    canvasContext.fillRect(0, 0, width, 100);

    analyser.getByteTimeDomainData(dataArray);  // Pour copier les données de forme d'onde ou du domaine temporel dans dataArray

    
    canvasContext.lineWidth = Math.random() * (10 - 2) + 2;
    var gradient=ctx.createLinearGradient(cptColor,0,170,cptColor);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    canvasContext.strokeStyle = gradient;

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

  canvasContext.lineTo(canvas2.width, canvas2.height / 2);
  
  // draw the path at once
  canvasContext.stroke();  
 }
  // call again the visualize function at 60 frames/s
  requestAnimationFrame(visualize);     // On va l'enlever par la suite et rajouter à la boucle d'animation
  
}
