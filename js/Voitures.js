
//***************** VOITURES ************************
class Voiture {
  constructor(x, y, l, h, R, couleur, direction) {
    this.x = x || 0;
    this.y = y || 0;
    this.l = l || 0;
    this.h = h || 0;
    this.couleur = couleur || 'black';
    this.direction = direction;
    this.vitesseX = 0; // en pixels par image d'animation
    this.vitesseY = 0; // en pixels par image d'animation
    this.vitesseMax = 8;

  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.couleur;
    ctx.fillRect(this.x, this.y, this.l, this.h);

    ctx.restore();
  }

  movemmm() {
    this.x += this.vitesseX;
    if (this.y < canvas.height) {this.y +=this.vitesseY;}
    else {
    	var index = voitures.indexOf(this);
    	if (index >-1){
    		voitures.splice(index,1);
    	}
    }
  }

  moveMissile() {
    this.x -= this.vitesseX;
    if (this.y >= 0) {this.y -=this.vitesseY;}
    else {
    	var index = missiles.indexOf(this);
    	if (index >-1){
    		missiles.splice(index,1);
    	}
    }
  }


  move() {
    if(this.direction === 1){
      this.x -= this.vitesseX;
      if (this.y >= 0) {this.y -=this.vitesseY;}
      else {
        var index = missiles.indexOf(this);
        if (index >-1){
          missiles.splice(index,1);
        }
      }
    }else{
      this.x += this.vitesseX;
      if (this.y < canvas.height) {this.y +=this.vitesseY;}
      else {
        var index = voitures.indexOf(this);
        if (index >-1){
          voitures.splice(index,1);
        }
      }
    }
  }
}
