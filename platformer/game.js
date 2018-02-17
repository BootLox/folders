var groundSprites;
var ground_Sprite_width = 50;
var ground_Sprite_height = 50;
var numgroundSprites;
var gravity = 1;
var player;
var jump = -5;
var obstacleSprites 

function setup() {
  obstacleSprites = new Group();
    createCanvas(400, 300);
    background (150, 200, 250);
    groundSprites = new Group();
    
    numgroundSprites = width/ground_Sprite_width +1;
    for (var n = 0; n < numgroundSprites; n++)
    {
    var groundSprite = createSprite(n*50, height-25, ground_Sprite_width, ground_Sprite_height);
    groundSprites.add(groundSprite);
  }
    
    player = createSprite(100, height-75, 50, 50);

}

function draw() {
    background(150, 200, 250);
    player.velocity.y = player.velocity.y + gravity
     if (groundSprites.overlap(player)) {
       player.velocity.y = 0;
       player.position.y = (height-50) - (player.height/2);
     }
      if (keyDown(32)) {
       player.velocity.y = jump;
      }
    player.position.x = player.position.x + 5;
    camera.position.x = player.position.x + (width/4);
    var firstGroundSprite = groundSprites[0];
    if (firstGroundSprite.position.x <= camera.position.x - (width/2)) { 
      groundSprites.remove(firstGroundSprite);
      firstGroundSprite.position.x = firstGroundSprite.position.x + numgroundSprites*firstGroundSprite.width;
      groundSprites.add(firstGroundSprite);
    }
    
    if (random() > 0.95) {
      var obstacle = createSprite(camera.position.x + width, (height-50) - 15, 30, 30);
       obstacleSprites.add(obstacle);
    }
    
    var firstObstacle = obstacleSprites[0];
  if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
  removeSprite(firstObstacle);
}
obstacleSprites.overlap(player, endGame);
    drawSprites();

}
function endGame() {

}