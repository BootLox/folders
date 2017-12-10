var isGameOver;
var enemy;
var player;

function setup() {
    isGameOver = false;
    createCanvas(250, 250);
    player = createSprite(width/2, height-25, 50, 50);
    enemy = createSprite(width/2, 0, 10, 30);
}

function draw() {

    if (isGameOver) {
        gameOver();
    } else {
        if (enemy.overlap(player)) {
            isGameOver = true;
        }

        background(0, 0, 100);
        drawSprites();

        if (enemy.overlap(player)) {
            gameOver();
        }

        if (keyDown("d")&& player.position.x < (width-25)) {
            player.position.x = player.position.x + 2;
        }

        if (keyDown("a")&& player.position.x > 25) {
            player.position.x = player.position.x - 2;
        }

        enemy.position.y = enemy.position.y + 3;

        if (enemy.position.y > height) {
            enemy.position.y = 0;
            enemy.position.x = random(5, width-5);
        }
    }
}

function gameOver() {
    background(0);
    textAlign(CENTER);
    fill("white");
    textSize(100);
    text("\u2639", width/2, height/2)
    textSize(21);
    text("Click to try again", width/2, height/2+40)
}

function mouseClicked() {
    if (isGameOver) {
        isGameOver = false;
        player.position.x = width/2;
        player.position.y = height-25;
        enemy.position.x = width/2;
        enemy.position.y = 0;
    }
}
