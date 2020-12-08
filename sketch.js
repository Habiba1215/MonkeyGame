var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

}


function draw() {
  background(255);

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  if (ground.x > 0) {
    ground.x = ground.width / 2;
  }

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

  }

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  spwanFood();
  spwanObstacles();

  
  drawSprites();
}

function spwanFood() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(250, 200, 20, 20);
    banana.y = Math.round(random(120, 200));
    //console.log(banana.y)
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 50;

    FoodGroup.add(banana);

  }
}

function spwanObstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    //obstacle.y = Math.round(round(120, 300));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;

    obstaclesGroup.add(obstacle);


  }

}