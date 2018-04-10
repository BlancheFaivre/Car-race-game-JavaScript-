//home/blanche/.git

window.onload = init;

let cpt_x = 5, cpt_y = -2;
let canvas, ctx;
let ennemis = [];
var dejaLancee = false;
var animation_id;

function my_function(){
	window.location.reload();
}
/*function my_function(){
	if (dejaLancee){
		window.cancelAnimationFrame(animation_id);
	}
	else {
		animation_id = requestAnimationFrame(animation);
	}
	dejaLancee = !dejaLancee;
}*/

// main.js
function init() {
  console.log("page chargee");
  
  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  
  // 2 On recupere le contexte graphique pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");
  
  // 3 on dessine pour verifier que ca marche
  //ctx.fillStyle = 'red';
  //ctx.fillRect(10, 10, 100, 100);
  rect1 = new Rectangle(10, 10, 30, 30, 'red');
  rect1.vitesseX = 5;
  rect1.vitesseY=3;
  ennemis.push(rect1);
  
  rect2 = new Rectangle(110, 110, 100, 100, 'green');
  rect2.vitesseY = 2;
  ennemis.push(rect2);
  joueur = new Rectangle(20, 250, 10, 10, 'blue');
  
  circ1 = new Circle(canvas.width / 2,canvas.length / 2,null,null, 45, 'green');

  circ1.vitesseY = 3;

  circ1.vitesseX = 2;

  ennemis.push(circ1);
  createEnnemis(5);
  // Ecouteurs de clavier
  window.onkeydown = traiteKeydown;
  window.onkeyup = traiteKeyup;
  
  // on demarre l'animation
  requestAnimationFrame(animation);
  //my_function();
}


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


function createEnnemis(nb){
  for (var i = 0; i < nb; i++){
    var random_boolean = Math.random() >= 0.5;
    var size = Math.floor(Math.random() * Math.floor(100));
    r = new Rectangle(Math.random() * canvas.width, 110, size, size, null, 'green', random_boolean);
    r.vitesseY =  Math.floor(Math.random() * Math.floor(5));
    r.vitesseX =  Math.floor(Math.random() * Math.floor(4));
    ennemis.push(r); 
  }
}

class Forme {
  constructor(x, y, l, h, R, couleur, m) {
    this.x = x || 0;
    this.y = y || 0;
    this.l = l || 20;
    this.h = h || 20;
    this.couleur = couleur || 'black';
    this.vitesseX = 0; // en pixels par image d'animation
    this.vitesseY = 0; // en pixels par image d'animation
    this.vitesseMax = 3;
    this.m = m;

  }
  
  move() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }
  
  size_change(){
    if (this.h > 70){
      cpt_x = -5;
    }
    else if (this.h < 20){
      cpt_x = 5;
    }
    if (this.l > 70){
      cpt_y = -2; 
    }
    else if (this.l < 20){
      cpt_y = 2;
    }
    this.h += cpt_x;
    this.l += cpt_y;
  }
}
// Une classe pour le rectangle
// typiquement dans rectangle.js
class Rectangle extends Forme {
  draw(ctx) {
    // Bonne pratique : si on modifie le contexte
    // couleur, epaisseur du trait, repere geometrique etc
    // on sauvegarde au debut de la fonction, on restaure a
    // la fin
    ctx.save();
    
    ctx.fillStyle = this.couleur;
    ctx.fillRect(this.x, this.y, this.l, this.h);
    
    ctx.restore();
  }
}

class Circle extends Forme {
  draw(ctx) {
    // Bonne pratique : si on modifie le contexte
    // couleur, epaisseur du trait, repere geometrique etc
    // on sauvegarde au debut de la fonction, on restaure a
    // la fin
    ctx.save();
    
    //dessin d'un cercle 
    //On efface le buffer du GPU
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI*2, false);
    ctx.fillStyle = this.couleur;
    //ctx.stroke();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

// Boucle d'animation
// typiquement dans game.js
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

function testeCollisions() {
  testeCollisionsAvecMurs(joueur);
  testCollisionsEnnemisMurs();
  testCollisionJoueursEnnemis();
}

function dessineEtDeplaceLesObjets() {
   ennemis.forEach((el) => {
     el.draw(ctx);
     el.move();
     if (el.m) {
       el.size_change();
     }
   })
  joueur.move();
  joueur.draw(ctx);
  
}

function size_change(){
  ennemis.forEach((el) => {
  })
}

function testCollisionsEnnemisMurs() {
   ennemis.forEach((el) => {
     testeCollisionsAvecMurs(el);
   })
   
  joueur.draw(ctx);
  
}
function testeCollisionsAvecMurs(r) {
  // MURS DROITE ET GAUCHE
  
  if((r.x + r.l) > canvas.width) {
    // detection avec mur de droite
    // on met la vitesse horizontale a zero
    r.vitesseX = -r.vitesseX;
    // on le remet au point de contact
    r.x = canvas.width - r.l;
  } else if((r.x) < 0) {
    // detection avec mur de gauche
    // on met la vitesse horizontale a zero
    r.vitesseX = -r.vitesseX;
    // on le remet au point de contact
    r.x = 0;
  }
  
  // MURS BAS ET HAUT
  if((r.y + r.h) > canvas.height) {
    // detection avec mur de droite
    // on met la vitesse horizontale a zero
    r.vitesseY = -r.vitesseY;
    // on le remet au point de contact
    r.y = canvas.height - r.h;
  } else if((r.y) < 0) {
    // detection avec mur de gauche
    // on met la vitesse horizontale a zero
    r.vitesseY = -r.vitesseY;
    // on le remet au point de contact
    r.y = 0;
  }
}

function testCollisionJoueursEnnemis() {
  ennemis.forEach((el) => {
        if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                 el.x, el.y, el.l, el.h)) {
    //console.log("collision");
    el.couleur = 'pink';
  } else {
    el.couleur = 'red';
  }      
 })
  
}

// Collisions between aligned rectangles
// dans collision.js
function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
 
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
     return false; // No horizontal axis projection overlap
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
     return false; // No vertical axis projection overlap
  return true; // If previous tests failed, then both axis projections
               // overlap and the rectangles intersect
}
