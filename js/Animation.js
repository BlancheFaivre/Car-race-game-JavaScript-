


// Boucle d'animation
// typiquement dans game.js
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  var image_route = document.getElementById("route");
  ctx.drawImage(image_route, 0, 0 + cpt, canvas.width, canvas.height);
  
  var image = document.getElementById("route2");
  ctx.drawImage(image, 0, -canvas.height + cpt, canvas.width, canvas.height);
  
  if (cpt == canvas.height){
  	cpt = 0;
  }
  else {
  	cpt = cpt + 10;
  }

  
  var voiture_joueur = document.getElementById("voiture_joueur");
  ctx.drawImage(voiture_joueur, joueur.x,joueur.y, 50,80);
  
  var voiture_ennemie = document.getElementById("voiture_ennemie");
  ctx.drawImage(voiture_ennemie, ennemi.x, ennemi.y, 50,80);
  
  if (collision){
	  var explosion = document.getElementById("explosion");
	  ctx.drawImage(explosion, x_explosion, y_explosion, 80,80);
	  collision = false;
	}
  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesObjets();
  
  // 3 on teste les collisions
  testeCollisions();
  
  // 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);
}

