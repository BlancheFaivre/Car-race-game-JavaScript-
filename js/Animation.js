function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //Image de la route
  var image = document.getElementById("route");
  ctx.drawImage(image, 0, 0 + cpt, canvas.width, canvas.height);
  
  var image = document.getElementById("route2");
  ctx.drawImage(image, 0, -canvas.height + cpt, canvas.width, canvas.height);
  
  if (cpt == canvas.height){
  	cpt = 0;
  }
  else {
  	cpt = cpt + 10;
  }

  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesObjets();
  
  // 3 on teste les collisions
  testeCollisions();
  
  // 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);
  
  
}
