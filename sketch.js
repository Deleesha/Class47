const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var myengine, myworld
var backgroundImg, ground ;
var obstacle1 ,obstacle2;
var player , playerImg;
var back;
var score = 0;
var scoreImg , scoreboard;
var life = 5;
const PLAY = 1;
const END = 0;
const CHANGE = 2;
var gameState = PLAY;
var level = 1;
var backgroundLevel1,backgroundLevel2;
var lifeImg1,lifeImg2,lifeImg3,lifeImg4,lifeImg5, displayLife;

function preload(){
  backgroundLevel1 = loadImage("images/fort.jpg");
  backgroundLevel2 = loadImage("images/forest1.png");
  obstacleImg1 = loadImage("images/obstacle1.png");
  obstacleImg2 = loadImage("images/obstacle2.png");
  image2 = loadImage("images/obstacle2.png");
  playerAnim = loadAnimation("images/player1.png","images/player2.png","images/player3.png","images/player4.png");
  arrowImage = loadImage("images/arrow.png");
  scoreImg = loadImage("images/scoreboard.png");
  lifeImg1 = loadImage("images/heart1.png");
  lifeImg2 = loadImage("images/heart2.png");
  lifeImg3 = loadImage("images/heart3.png");
  lifeImg4 = loadImage("images/heart4.png");
  lifeImg5 = loadImage("images/heart5.png");
}

function setup() {
  
  createCanvas(displayWidth,displayHeight);
 
  myengine = Engine.create();
  myworld = myengine.world;
  
  back = createSprite(displayWidth / 2,displayHeight / 2,displayWidth,displayHeight);
  back.velocityX = -5;
  back.addImage("fort",backgroundLevel1);
  back.addImage("forest",backgroundLevel2);
  back.scale= 2;

  ground = new Ground(displayWidth/2 ,displayHeight - 100,displayWidth,20);
 
  player = createSprite(displayWidth/8,displayHeight-200);
  player.addAnimation("player Running",playerAnim);

  scoreboard = createSprite(displayWidth-300,displayHeight/4,50,50);
  scoreboard.addImage(scoreImg);
  score.scale = 1.5;

  displayLife = createSprite(displayWidth-400,displayHeight/4.5);
  displayLife.addImage("heart1",lifeImg1);
  displayLife.addImage("heart2",lifeImg2);
  displayLife.addImage("heart3",lifeImg3);
  displayLife.addImage("heart4",lifeImg4);
  displayLife.addImage("heart5",lifeImg5);

  obstaclesGroup = new Group();
  arrowGroup = new Group();



  Engine.run(myengine);

}

function draw() {

  background(0);  
  Engine.update(myengine);

 
  drawSprites();

      if(gameState === PLAY){

          destroyObstacle();
          spawnObstacles();
          moveBackground();
          destroyPlayer();

          console.log(gameState);

          if(score > 5 && level === 1 ){
              gameState = CHANGE;
              loadLevel2();
          }

      }

      else if(gameState === END){

        fill("purple");
        textSize(40);
        text("GAME OVER",displayWidth/2, displayHeight/2);

        //obstaclesGroup.setVelocityXEach(0);
        arrowGroup.destroyEach();
        obstaclesGroup.destroyEach();
        back.velocityX = 0;
  
      }

 

 

  scoreBoard();
  
//ground.display();
}

function keyPressed(){

    if(keyCode === UP_ARROW && gameState === PLAY){
        /* console.log(keyCode);
        console.log(player.body.position);*/
        //Matter.Body.setPosition(player.body, {x : player.body.position.x , y : player.body.position.y-200});
        createArrow();
    }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(displayWidth,displayHeight-200,10,40);
    obstacle.velocityX = -4 - score;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacleImg1);
               break;
       case 2: obstacle.addImage(obstacleImg2);
               break;

       default: break;
     }
    
     obstaclesGroup.add(obstacle);
  }
 }

 function createArrow(){

    var arrow = createSprite(player.x,player.y);
    arrow.velocityX = 10;
    arrow.addImage(arrowImage);
    arrow.scale = 0.5;

    arrowGroup.add(arrow);
 }

 function destroyObstacle(){

    for(var i=0; i<obstaclesGroup.length; i++){
      if(obstaclesGroup.get(i).isTouching(arrowGroup)){
          obstaclesGroup.get(i).destroy();
          arrowGroup.destroyEach();
          score = score+1;
      }
      }

 }

 function destroyPlayer(){

    if(obstaclesGroup.isTouching(player)){

          for(var i=0; i<obstaclesGroup.length; i++){
            if(obstaclesGroup.get(i).isTouching(player)){
                obstaclesGroup.get(i).destroy();
                life = life - 1;
            }
            }
    }

    if(life === 0){

      player.destroy();

      gameState = END;
    }

 }

 function moveBackground(){

    if(back.x < 0){
      back.x = displayWidth/2;
    }

 }

 function endGame(){

    if(life === 0){
        gameState = END;
    }

 }

 function scoreBoard(){

  textFont("Algerian");
  textStyle(BOLD);

  fill(247,99,94);
  textSize(30);
  text( life + "       :       " + score, displayWidth-375,displayHeight/3.5);

 
  fill("blue");
  text("LIFE        SCORE  " , displayWidth-400,displayHeight/4.5);

  switch(life){
    
  case 1 : displayLife.changeImage("heart1",lifeImg1);
             break;
             
  case 2 : displayLife.changeImage("heart2",lifeImg2);
             break;

  case 3 : displayLife.changeImage("heart3",lifeImg3);
             break;

  case 4 : displayLife.changeImage("heart4",lifeImg4);
             break; 

  case 5 : displayLife.changeImage("heart5",lifeImg5);
            break;

   default:  break;          
  }

  
 }

 function loadLevel2(){

  back.changeImage("forest",backgroundLevel1);

  if(life < 5 && gameState === CHANGE ){
      life =life + 1;
  }
    gameState = PLAY;
 }

 function startLevel2(){

 }