
//50 200     370 520


function traiteKeydown(evt) {
  let code = evt.code;
  switch(code) {
    case 'ArrowRight':
      // on va vers la droite
      switch(joueur.x) {
      	case 50 :
      		joueur.x = 200;
      		break;
      	case 200 :
      		joueur.x = 370;
      		break;
      	case 370 :
      		joueur.x = 520;
      		break;
      }
      break;
    case 'ArrowLeft':
      // on va vers la gauche
      //joueur.vitesseX = -joueur.vitesseMax;
      switch(joueur.x) {
      	case 200 :
      		joueur.x = 50;
      		break;
      	case 370 :
      		joueur.x = 200;
      		break;
      	case 520 :
      		joueur.x = 370;
      		break;
      }
      break;
    case 'ArrowUp':
      // on va vers la droite
      joueur.vitesseY = -joueur.vitesseMax;
      break;
    case 'ArrowDown':
      // on va vers la gauche
      joueur.vitesseY = joueur.vitesseMax;
      break;
    case 'Space' :
      if ((nb_voitures_gagnees > 0)&&(joueur_appuye_sur_commencer)) missile_lance = true;
      break;
    case 'Enter' :
      if (!joueur_appuye_sur_commencer) joueur_appuye_sur_commencer = true;
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
