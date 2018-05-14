
function testeCollisions() {
  testeCollisionsAvecMurs(joueur);
  testCollisionsEnnemisMurs();
  testCollisionJoueursEnnemis();
}

function dessineEtDeplaceLesObjets() {
   voitures.forEach((el) => {
     el.draw(ctx);
     el.move();
   })

   voitures_bonus.forEach((el) => {
     el.draw(ctx);
     el.move();
   })

   joueur.move();
   // Pour empecher la voiture de sombrer vers le bas
   if (joueur.y > canvas.height - 100) {joueur.y = canvas.height - 100;}

   missiles.forEach((el) => {
     el.draw(ctx);
     el.move();
   })

   vies.forEach((el => {
     el.draw(ctx);
     el.move();
   }))

   joueur.draw(ctx);

}

function testCollisionsEnnemisMurs() {
  /* voitures.forEach((el) => {
     testeCollisionsAvecMurs(el);
   })*/
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
  voitures.forEach((el) => {
    if((((el.y + 50) > joueur.y)&&(el.y < joueur.y + 50))&&(el.x == joueur.x)) {
      collision = true;
      x_explosion = joueur.x - 10;
      y_explosion = joueur.y - 20;
      if (nb_vies > 0) {nb_vies -= 1;}
      else {
      	go_fin = true;
        ctx_fin.font = "60px Georgia";
      	ctx_fin.fillText("PERDU !", 170, 260);
      	ctx_fin.fillText("Votre score est de ", 10, 310);
        if (score < 100)ctx_fin.fillText(score.toString(), 260, 380);
        else if (score < 1000) ctx_fin.fillText(score.toString(), 240, 380);
        else if (score < 10000) ctx_fin.fillText(score.toString(), 210, 380);
        else ctx_fin.fillText(score.toString(), 230, 380);
      }
      if (nb_vies > 0) {
        var index = voitures.indexOf(el);
    	   if (index >-1){
    		     voitures.splice(index,1);
    	   }
      }
    }
    missiles.forEach((mi)=>{
      if ((el.x + 15 == mi.x)&&(el.y <= mi.y + 20)&&(el.y >= mi.y - 60)){
        nb_voitures_rouges_tuees++;
        score += 10;
        var index = voitures.indexOf(el);
         if (index >-1){
             voitures.splice(index,1);
         }
         var index2 = missiles.indexOf(mi);
          if (index2 >-1){
              missiles.splice(index2,1);
          }
      }
    })
 })

  voitures_bonus.forEach((el) => {
    if((((el.y + 50) > joueur.y)&&(el.y + 50 < joueur.y + 50))&&(el.x == joueur.x)) {
      nb_voitures_gagnees += 1;
      var index = voitures_bonus.indexOf(el);
    	if (index >-1){
    		voitures_bonus.splice(index,1);
    	}

    }
 })

 vies.forEach((el) => {
   if((((el.y + 50) > joueur.y) && (el.y + 50 < joueur.y + 50)) && (el.x == joueur.x)){
     // incrémenter nombre de coeurs
     if(nb_vies < 3){
      nb_vies++;
     }
     var index = vies.indexOf(el);
     if(index > -1){
       vies.splice(index, 1);
     }
   }
 })

}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
     return false; // No horizontal axis projection overlap
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
     return false; // No vertical axis projection overlap
  return true; // If previous tests failed, then both axis projections
               // overlap and the rectangles intersect
}
