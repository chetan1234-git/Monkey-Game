
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(400,400);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(100,300,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  
    
  ground = createSprite(200,370,800,10);
  ground.scale = 1;
  
  
}

function draw(){
  background("skyblue");
  textSize(20);
  fill("purple");
  text("SURVIVAL TIME: "+score, 130, 20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    
   
    if(keyDown("space")) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY+0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      score =score+1 ;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.scale = 0.12;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    stroke("yellow")
    textSize(30);
    text("GAME OVER", 100, 170);
    fill("yellow");
    textSize(20);
    text("THANKS FOR PLAYING", 80, 200);
    }
  
  
  
  drawSprites(); 
  
  monkey.collide(ground);
}

function bananas(){
  
     banana  = createSprite(500,500,1,1);   
     banana.addAnimation("banana", bananaImage);
     banana.scale = 0.1;

if(World.frameCount % 80 == 0){
     banana.y = Math.round(random(120,200));

}
    banana.velocityX =-7;
    banana.lifetime = 100;

    bananaGroup.add(banana);
   
    
 
  

  
}

function obstacles(){
obstacle = createSprite(500,500,10,10);
obstacle.addAnimation("rock", obstacleImage);
obstacle.scale = 0.1;      
if(World.frameCount % 300 == 0){
  obstacle.y = Math.round(random(350,350));
}
obstacle.velocityX =-7;

    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);

}