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


function dessine_voitures(){
	voiture1 = new Voiture(10,10,30,30,'red');
	voiture1.vitesseX = 0;
	voiture1.vitesseY = 5;
}

