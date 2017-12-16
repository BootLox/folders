var isGameOver;

var enemy;
var enemyImage;

var enemy2;
var enemyImage2;

var player;
var playerImage;

var backgroundImage;

function preload(){
  playerImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/N5uCbDu.png");
  enemyImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
   enemyImage2 = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
  backgroundImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/aKQOg3G.png");
}


// Main setup loop, runs once per page load
function setup() {
    isGameOver = false;
    createCanvas(256, 256);
    player = createSprite(width/2, height-25, 50, 50);
    player.addImage(playerImage);
    enemy = createSprite(width/2, 0, 10, 30);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed = 4.0;
        enemy2 = createSprite(width/2, 0, 10, 30);
    enemy2.addImage(enemyImage);
    enemy2.rotationSpeed = 7.0;
}

// Main draw loop
function draw() {
    // If the game is over, display screen telling user
    if (isGameOver) {
        gameOver();
    } else {
        // Otherwise, continue game..

        // If player block and projectiles are touching, game over :(
        if (enemy.overlap(player)) {
            isGameOver = true;
        }
        
         if (enemy2.overlap(player)) {
                isGameOver = true;
            
             }

        // Set background
        background(backgroundImage);
        // Re-render sprites
        drawSprites();

        // If player is not touching the left edge
        if (player.position.x < (width-25)) {
            // And either D or -> key is pressed
            if(keyDown("d") | keyDown(39)) {
                // Move player right
                player.position.x = player.position.x + 5;
            }
        }

        // If player is not touching the right edge
        if (player.position.x > 25) {
            // And either A or <- key is pressed
            if(keyDown("a") | keyDown(37)) {
                // Move player left
                player.position.x = player.position.x - 5;
            }
        }

        // Move enemy down by 5
        enemy.position.y += random(1,10)

        // Once enemy has left screen, move to top and randomize x position
        if (enemy.position.y > height) {
            enemy.position.y = 0;
            enemy.position.x = random(5, width-5);
        }
              
              // Move enemy down by 5
        enemy2.position.y += random(1,10)

        // Once enemy has left screen, move to top and randomize x position
        if (enemy2.position.y > height) {
            enemy2.position.y = 0;
            enemy2.position.x = random(5, width-5);
        }
        

        // debug
        //console.log("Enemy X: "+enemy.position.x+", Enemy Y: "+enemy.position.y+", Player X: "+player.position.x+", Player Y: "+player.position.y);
    }
}

// Function runs on game lost
function gameOver() {
    background(0);
    textAlign(CENTER);
    fill("white");
    textSize(100);
    text("\u2639", width/2, height/2);
    textSize(21);
    text("Click or type try again", width/2, height/2+40);
}

// Function runs when key/mouse is pressed after game over
function restartGame() {
    if(isGameOver) {
        isGameOver = false;
        player.position.x = width/2;
        player.position.y = height-25;
        enemy.position.x = width/2;
        enemy.position.y = 0;
         enemy2.position.x = width/5;
        enemy2.position.y = 0;
        
    }
}

// Event Functions

function mouseClicked() {
    // If mouse is clicked, attempt to restart game
    if(isGameOver) {
        restartGame();
    }
}

function keyPressed() {
    //If key pressed is not A, D, <- or ->, then restart game
     //(done to prevent accidental restarts)
    if(keyCode !== 65 && keyCode !== 68 && keyCode !== 39 && keyCode !== 37 && isGameOver) {
       restartGame(); 
    }
    
}

