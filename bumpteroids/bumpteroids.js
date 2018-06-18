var ship;
var asteroids
var bullets;
var bulletimage; var backgroundImage; var particleImage; var shipImage;
//change
function preload() {
  // load images
  backgroundImage = loadImage("images/background.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
     ship = createSprite(width/2, height/2);
     ship.maxSpeed = 6;
     ship.friction = .98;
     shipImage = loadImage("images/asteroids_ship0001.png");
     bulletImage = loadImage("images/asteroids_bullet.png");
     ship.addImage("normal", shipImage);
     ship.addAnimation("thrust", "images/asteroids_ship0002.png", "images/asteroids_ship0003.png", "images/asteroids_ship0004.png", "images/asteroids_ship0005.png", "images/asteroids_ship0006.png", "images/asteroids_ship0007.png");
     particleImage = loadImage("images/asteroids_particle.png");
   bullets = new Group();
  asteroids = new Group();
 for (var i = 0; i<8; i++) {
  
   {
     
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createAsteroid(3, px, py);
  }
 }
}

function draw() {
  // set background
  background(backgroundImage);
    
  // set the text fill
  fill(254,190,190);

  // set the text alignment
  textAlign(RIGHT);

  // set the text size
  textSize(12);

     text("W + A + D keys to move. K to shoot", width-30, 30);
  
  for (var i=0; i<allSprites.length; i++) {
 
   var s = allSprites[i];

   if (s.position.x<-0) s.position.x = width;

   if (s.position.x>width) s.position.x = 0;

   if (s.position.y<-0) s.position.y = height;

   if (s.position.y>height) s.position.y = 0;
  
  }
  
  asteroids.overlap(bullets, asteroidHit);

    
  if (keyDown("A"))
    ship.rotation -= 4;

  if (keyDown("D"))
    ship.rotation += 4;
   
  if (keyDown("W")) {
    ship.addSpeed(.2, ship.rotation);
     ship.changeAnimation("thrust");
  }
  else {
    ship.changeAnimation("normal");
  }

  if (keyWentDown("space")) {
     var bullet = createSprite(ship.position.x, ship.position.y);
  bullet.addImage(bulletImage);
  bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
  bullet.life = 30;
  bullets.add(bullet);
}



  drawSprites();
}

function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("images/mainasteroid.png");
  a.addImage(img);

  a.type = type;
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  
    if (type == 2) a.scale = .6; 
    if (type == 1) a.scale = .3; 

  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
   var newType = asteroid.type-1;
   
     if (newType>0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }
  
  for (var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(particleImage);
    p.setSpeed(random(3,5), random(360));
    p.friction = 0.95;
   p.life = 15;

  }

  bullet.remove();
  asteroid.remove();
}
