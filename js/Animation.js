function no_ennemis_en_vue(){
	voitures.forEach((el) => {
		if (el.y < 100) return false;
	});
	return true;
}

// Boucle d'animation
// typiquement dans game.js
function animation() {
	if ((!stop_partie)&&(!pause_partie)) {
		cpt_tours ++;
		switch(cpt_tours){
			case 1000 : niveau=1; frequence_envoi -= 20; break;
			case 2500 : niveau=2; frequence_envoi -= 20;break;
			case 5000 : niveau=3; frequence_envoi -= 20;break;
			case 10000 : niveau=4; frequence_envoi -= 20;break;
		}
		if (cpt_tours%5 == 0) score++;
		// 1 on efface
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var image_route = document.getElementById("route");
		ctx.drawImage(image_route, 0, 0 + cpt, canvas.width, canvas.height);

		var image = document.getElementById("route2");
		ctx.drawImage(image, 0, -canvas.height + cpt, canvas.width, canvas.height);

		if (cpt >= canvas.height - 10){
			cpt = 0;
		}
		else {
			console.log(niveau);
			switch(niveau){
				case 0 : cpt += 6; break;
				case 1 : cpt += 8; break;
				case 2 : cpt += 12; break;
				case 3 : cpt += 16; break;
				case 4 : cpt += 20; break;
			}
			//cpt += 10;
		}

		var rand = Math.floor((Math.random() * frequence_envoi) + 1);
		if ((rand % frequence_envoi == 0)&&(no_ennemis_en_vue())){
			var r = Math.floor((Math.random() * 4) + 1);
			if (r == 1) x_ennemi = 50;
			else if (r == 2) x_ennemi = 200;
			else if (r == 3) x_ennemi = 370;
			else x_ennemi = 520;
			ennemi1 = new Voiture(x_ennemi, 0, 0, 0, 0, 'black');
			ennemi1.vitesseY = 3;
			voitures.push(ennemi1);
		}

		 voitures.forEach((el) => {
		 	var voiture_ennemie = document.getElementById("voiture_ennemie");
			ctx.drawImage(voiture_ennemie, el.x, el.y, 50,80);
		 })

		var voiture_bonus_gagnees = document.getElementById("voiture_bonus");
		ctx.drawImage(voiture_bonus_gagnees, 10,10, 30,50);
		ctx.fillText(nb_voitures_gagnees.toString(), 15, 90);

		var voiture_joueur = document.getElementById("voiture_joueur");
		ctx.drawImage(voiture_joueur, joueur.x,joueur.y, 50,80);

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

	}
	else {
		mediaElement.pause();
	}
	// 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);
}
