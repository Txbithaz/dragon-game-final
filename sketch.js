var bg;
var dragonflying;
var background_image;
var ground;
var fire;
var fire_image;
var gameOver_image;
var gameOver;
var gameState = "play";
var stones
var lives = 5;
var jumpSound;
var stoneSound;
var fireSound;

function preload() {
  bg = loadImage("./assets/background.jpg");
  dragonflying = loadAnimation("./assets/dragon1.png", "./assets/dragon2.png", "./assets/dragon3.png");
  fire_image = loadAnimation("./assets/fire1.png", "./assets/fire2.png", "./assets/fire3.png", "./assets/fire4.png", "./assets/fire5.png", "./assets/fire6.png");
  gameOver_image = loadImage("./assets/gameOver.png");
  Stone_img = loadImage("./assets/obstacle2.png");

  jumpSound = loadSound("./assets/jump.wav");
  stoneSound = loadSound("./assets/stonesound.ogg");
  fireSound = loadSound("./assets/firesound.wav");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background_image = createSprite(width, height/2, width, height);
  background_image.addImage(bg);
  background_image.scale = 2.5;
  background_image.velocityX = -3;

  dragon = createSprite(width/2-500, height/2+50, 100, 200);
  dragon.addAnimation("running", dragonflying);
  dragon.scale = 0.7;

  ground = createSprite(width/2, height-20, width, 20);

  gameOver = createSprite(width/2, height/2, 50, 50);
  gameOver.addImage(gameOver_image);
  gameOver.visible = false;

  dragon.setCollider("circle", 0, 0, 150);

  fireGroup = new Group();
  stoneGroup = new Group();
}
function SpawnFire() {
  if(frameCount%250 == 0) {
    var fire;
    fire = createSprite(width-200, height-200, 10, 10);
    fire.addAnimation("fire", fire_image);
    fire.scale = 0.5;
    fire.velocityX = -5;
    fireGroup.add(fire);
    fire.setCollider("circle", 0, 0, 100);
  }
}

function SpawnStones() {
  if(frameCount%150 == 0) {
    Stone = createSprite(width/2, height/2, width, height);
    Stone.addImage("Stone", Stone_img);
    Stone.scale = 0.3;
    Stone.velocityX = -5;
    stoneGroup.add(Stone);
    Stone.setCollider("circle", 0, 0, 100);
  }
}

function draw() {

  if(gameState == "play") {
    background(0);
  
    SpawnFire()
    if(fireGroup.isTouching(dragon)||stoneGroup.isTouching(dragon)) {
      if(fireGroup.isTouching(dragon)) {
        fireSound.play();
      }
        if(stoneGroup.isTouching(dragon)) {
          stoneSound.play();
      }
      if(lives>1) {
        lives = lives-1
        fireGroup.destroyEach();
        stoneGroup.destroyEach();
        gameState = "reset"
        console.log("lives>0");
      }
      else{
        gameState = "end"
        gameOver.visible = true;
      }
    }
    SpawnStones()

    if(background_image.x<200) {
      background_image.x = width
    }
  
    if(keyDown("space")){
      dragon.velocityY = -10;
      jumpSound.play();
    }
    dragon.velocityY += 0.5;
  
    dragon.collide(ground);
  }

  else if(gameState == "end"){
    gameOver()
  }
  if(gameState == "reset") {
    gameReset()
  }
  drawSprites()

  textSize(35);
  text("lives:"+ lives, 100, 100);
}
function gameReset() {
  dragon.x = width/2-500;
  console.log("gamereset");
  background_image.x = 0;
  gameState = "play"
}

function gameOver() {
  background = velocityX = 0;
  dragon = velocityX = 0;
  fireGroup.setVelocityXEach(0);
}