class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // AM
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    //objetos, combustible y monedas
    fuels = new Group();
    powerCoins = new Group();

    //sprite del combustible
    this.addSprites(fuels, 4, fuelImage, 0.02);
    //sprite de las monedas
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
  }

  //C38 AM Este metodo es para agregar mis sprites, donde le asigno un mumero
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale){
    for(var i = 0; i < numberOfSprites; i++){
      var x, y;

      x = random(width / 2 + 150, width / 2 -150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x,y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  // AA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); // Agregado

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      // indice del arreglo
      var index = 0;
      for (var plr in allPlayers) {
        // Usa datos de la base de datos para mostrar los autos en dirección x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;

        // Agrega 1 al índice en cada ciclo
        index = index + 1;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
        }
      }

      // Manipulación de eventos de teclado
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }

  handleFuel(index) {
    // Agregando combustible 
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185; // "collected" es el sprite en el grupo de coleccionables que detona 
      // el evento 
      collected.remove(); 
     });
   }
 
   handlePowerCoins(index) { 
     // Agregando monedas 
     cars[index - 1].overlap(powerCoins, function(collector, collected) { 
       player.score += 21; player.update(); 
       //"collected" es el sprite en el grupo de coleccionables que detona 
       // el evento 
       collected.remove();
      }); 
     } 
}

