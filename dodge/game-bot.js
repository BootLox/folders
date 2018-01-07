var isGameOver;

var enemy;
var enemyImage;

var enemy2;
var enemyImage2;

var player;
var playerImage;

var backgroundImage;

var score = 0;

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
        
        // Render score
        textAlign(CENTER);
        fill("white");
        text("Score: "+score, width/2, height/2-110);
        
        if(enemy.position.x > (player.position.x-40) && enemy.position.x < (player.position.x+40)) {
            //if(player.position.x < 50)
            player.position.x += 5;
        }
        
        if(enemy2.position.x > (player.position.x-40) && enemy2.position.x < (player.position.x+40)) {
            player.position.x -= 5;
        }
        
        // 
        if(player.position.x < 0) {
            player.position.x = 0;
        }
        
        if(player.position.x > 240) {
            player.position.x = 240;
        }

        // Move enemy down by 5
        enemy.position.y += random(1,7)

        // Once enemy has left screen, move to top and randomize x position
        if (enemy.position.y > height) {
            enemy.position.y = 0;
            enemy.position.x = random(5, width-5);
            score++;
        }
              
        // Move enemy down by 5
        enemy2.position.y += random(1,7)

        // Once enemy has left screen, move to top and randomize x position
        if (enemy2.position.y > height) {
            enemy2.position.y = 0;
            enemy2.position.x = random(5, width-5);
            score++;
        }

        // debug
        console.log("Enemy X: "+enemy.position.x+", Enemy Y: "+enemy.position.y+", Player X: "+player.position.x+", Player Y: "+player.position.y);
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
    textSize(14);
    text("Final score: "+score, width/2, height/2+65);
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
        score = 0;
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
    //If key pressed, then restart game
    if(isGameOver) {
       restartGame(); 
    }
    
}

