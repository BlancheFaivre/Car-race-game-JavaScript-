


// Boucle d'animation
// typiquement dans game.js
function animation() {
	cpt_tours ++;
	if (cpt_tours%5 == 0) score++;
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

  
  var voiture_bonus_gagnees = document.getElementById("voiture_bonus");
  ctx.drawImage(voiture_bonus_gagnees, 10,10, 30,50);
  ctx.fillText(nb_voitures_gagnees.toString(), 15, 90);
  
  var voiture_joueur = document.getElementById("voiture_joueur");
  ctx.drawImage(voiture_joueur, joueur.x,joueur.y, 50,80);
  
  var voiture_ennemie = document.getElementById("voiture_ennemie");
  ctx.drawImage(voiture_ennemie, ennemi.x, ennemi.y, 50,80);
  
  var voiture_bonus = document.getElementById("voiture_bonus");
  ctx.drawImage(voiture_bonus, bonus.x,bonus.y, 50,80);
  
  if (collision){
	  var explosion = document.getElementById("explosion");
	  ctx.drawImage(explosion, x_explosion, y_explosion, 80,80);
	  collision = false;
	}
	var n = 500;
	ctx.font = "30px Sawasdee";
	ctx.fillStyle = "white";
  ctx.fillText("Score", 500,30);
  if (score < 10) n = 530;
  else if ((score >= 10)&&(score < 100)) n = 520;
  else if ((score >= 100)&&(score < 1000)) n = 510;
  else if ((score >= 1000)&&(score < 10000)) n = 500;
  else if ((score >= 10000)&&(score < 100000)) n = 495;
  else n = 475;
  ctx.fillText(score.toString(), n, 60);
  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesObjets();
  
  // 3 on teste les collisions
  testeCollisions();
  
  // 4 on rappelle la boucle d'animation 60 fois / s
  if (!stop_partie) requestAnimationFrame(animation);
}

