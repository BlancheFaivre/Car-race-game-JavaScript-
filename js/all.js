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

//******************* ANIMATION *********************
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesObjets();
  
  // 3 on teste les collisions
  testeCollisions();
  
  // 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);
}

function dessine_voitures(){
	voiture1 = new Voiture(10,10,30,30,'red');
	voiture1.vitesseX = 0;
	voiture1.vitesseY = 5;
}

//***************** VOITURES ************************
class Voiture {
  constructor(x, y, l, h, R, couleur) {
    this.x = x || 0;
    this.y = y || 0;
    this.l = l || 20;
    this.h = h || 20;
    this.couleur = couleur || 'black';
    this.vitesseX = 0; // en pixels par image d'animation
    this.vitesseY = 0; // en pixels par image d'animation
    this.vitesseMax = 3;

  }
  
  move() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }
  
  draw(ctx) {
    ctx.save();
    
    ctx.fillStyle = this.couleur;
    ctx.fillRect(this.x, this.y, this.l, this.h);
    
    ctx.restore();
  }
}

//************** TEST DES COLLISIONS ***************
function testeCollisions() {
  testeCollisionsAvecMurs(joueur);
  testCollisionsEnnemisMurs();
  //testCollisionJoueursEnnemis();
}

function dessineEtDeplaceLesObjets() {
   voitures.forEach((el) => {
     el.draw(ctx);
     el.move();
   })
  
}


function testCollisionsEnnemisMurs() {
   voitures.forEach((el) => {
     testeCollisionsAvecMurs(el);
   })
   
  joueur.draw(ctx);
  
}
function testeCollisionsAvecMurs(r) {
  // MURS DROITE ET GAUCHE
  
  if((r.x + r.l) > canvas.width) {
    r.vitesseX = -r.vitesseX;
    r.x = canvas.width - r.l;
  } else if((r.x) < 0) {
    r.vitesseX = -r.vitesseX;
    r.x = 0;
  }
  
  // MURS BAS ET HAUT
  if((r.y + r.h) > canvas.height) {
    r.vitesseY = -r.vitesseY;
    r.y = canvas.height - r.h;
  } else if((r.y) < 0) {
    r.vitesseY = -r.vitesseY;
    r.y = 0;
  }
}

/*function testCollisionJoueursEnnemis() {
  voitures.forEach((el) => {
        if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                 el.x, el.y, el.l, el.h)) {
    el.couleur = 'pink';
  } else {
    el.couleur = 'red';
  }      
 })
  
}*/

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
 
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
     return false; // No horizontal axis projection overlap
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
     return false; // No vertical axis projection overlap
  return true; // If previous tests failed, then both axis projections
               // overlap and the rectangles intersect
}

//************** GESTION DES FLECHES ***************
function traiteKeydown(evt) {
  let code = evt.code;
  switch(code) {
    case 'ArrowRight':
      // on va vers la droite
      joueur.vitesseX = joueur.vitesseMax;
      break;
    case 'ArrowLeft':
      // on va vers la gauche
      joueur.vitesseX = -joueur.vitesseMax;
      break;
    case 'ArrowUp':
      // on va vers la droite
      joueur.vitesseY = -joueur.vitesseMax;
      break;
    case 'ArrowDown':
      // on va vers la gauche
      joueur.vitesseY = joueur.vitesseMax;
      break;
  }
}

function traiteKeyup(evt) {
  let code = evt.code;
  
  switch(code) {
    case 'ArrowRight':
    case 'ArrowLeft':
      // on s'arrete horizontalement
      joueur.vitesseX = 0;
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      // on s'arrete horizontalement
      joueur.vitesseY = 0;
      break;
  }
}
  
  


