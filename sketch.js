//Basic Variables
var gameState;
var LOAD = 0;
var L1 = 1;
var L2 = 2;
var END = 3;


//Gamestate "LOAD" Variables
var loadSCR, backImg;
var playBTN, playImg;
var score;

//Gamestate "L1" Variables
var survivor, monster ,villager;
var survivorImg, survivorImg1, survivorImg2, survivorImg3, survivorImg4, survivorImg5, monsterImg , villagerImg;
var ground1, ground1Img;
var wall1, wall2, wall3, wall4, wall5, wall6;

//Gamestate "L2" Variables
var ground2, ground2Img;
var car, carImg, carGroup;
var score = 0;

//Gamestate "END" Variables
var endBlock, blockImg;
var gameOver, gameOverImg;
var retry, retryImg;


function preload(){
   backImg = loadImage("Images/loadSCR.jpg"); 
   playImg = loadImage("Images/playBTN.png");
   ground1Img = loadImage("Images/ground1.png");
   survivorImg = loadImage("Images/survivorRUN1.png");
   ground2Img = loadImage("Images/ground2.jpg");

   survivorImg1 = loadAnimation("Images/survivorRUN1.png","Images/survivorRUN2.png","Images/survivorRUN3.png");
   survivorImg2 = loadAnimation("Images/survivorRUN4.png","Images/survivorRUN5.png","Images/survivorRUN6.png");
   survivorImg3 = loadAnimation("Images/survivorRUN7.png","Images/survivorRUN8.png","Images/survivorRUN9.png");
   survivorImg4 = loadAnimation("Images/survivorRUN10.png","Images/survivorRUN11.png","Images/survivorRUN12.png");

   carImg = loadImage("Images/car.png");
   treeImg = loadImage("Images/tree.png");
   blockImg = loadImage("Images/end.jpg");
   gameOverImg = loadImage("Images/gameOver.png");
   retryImg = loadImage("Images/restart.png");
}

function setup() {
  createCanvas(2700,1500);

  loadSCR = createSprite(1800,400,500,500);
    loadSCR.addImage("loading",backImg);
    loadSCR.scale = 5.7
     
  playBTN = createSprite(1200,850,600,80);
    playBTN.addImage("playBTN",playImg);
    playBTN.scale = 15;
   
  ground1 = createSprite(1350,750,10,10);
    ground1.addImage("ground",ground1Img);
    ground1.scale = 2.4;   
       ground1.visible = false;
          
  survivor = createSprite(1350,800,10,10);
    survivor.visible = false;
    survivor.addAnimation("leftrun",survivorImg2);
    survivor.addAnimation("downrun",survivorImg1);
    survivor.addAnimation("uprun",survivorImg3);
    survivor.addAnimation("rightrun",survivorImg4);
      survivor.scale = 4;

       wall1 = createSprite(220,750,10,10000);
      wall1.visible = false;

       wall2 = createSprite(300,100,400,10);
       wall2.visible = false;

       wall3 = createSprite(2400,100,400,10);
       wall3.visible = false;

       wall4 = createSprite(2470,750,10,10000);
       wall4.visible = false;

       wall5 = createSprite(1050,1250,10000,10);
       wall5.visible = false;


    ground2 = createSprite(1350,750,100,100);
    ground2.addImage(ground2Img);
      ground2.visible = false;
        ground2.scale = 3.9;
    
        carGroup = createGroup();
         //treeGroup = createGroup();
}
function draw() {
  background("green"); 
  



  if(mousePressedOver(playBTN)){
    gameState = L1;
    playBTN.visible = false;
    loadSCR.visible = false;
   }


 
// GameState LOAD 
   if(gameState === LOAD ){
     playBTN.visible = true;
     loadSCR.visible = true;
   } 


//GameState Level 1
    if(gameState === L1 ){
      ground1.visible = true;
      survivor.visible = true;
        
 

      if(keyDown(DOWN_ARROW)){
        survivor.changeAnimation("downrun",survivorImg1);
        survivor.y = survivor.y + 11
      }
  
   if(keyDown(LEFT_ARROW)){
      survivor.changeAnimation("leftrun",survivorImg2);
      survivor.x = survivor.x - 11
   }
 
   if(keyDown(UP_ARROW)){
      survivor.changeAnimation("uprun",survivorImg3);
      survivor.y = survivor.y - 11
   }

   if(keyDown(RIGHT_ARROW)){
      survivor.changeAnimation("rightrun",survivorImg4);
      survivor.x = survivor.x + 11
   }

   if(survivor.isTouching(edges)){
    gameState = L2;
    }
  }
   

//GameState Level 2
if(gameState === L2){
  ground2.visible = true;
  ground2.velocityY = 6

  //wall6 = createSprite(1350,750,2050,1050);
   survivor.y = survivor.y + 58;



  if(frameCount % 60 === 0){
    ground2.y = ground2.width/2;
  }



  if(keyDown(DOWN_ARROW)){
    survivor.changeAnimation("downrun",survivorImg1);
    survivor.y = survivor.y + 11
  }

if(keyDown(LEFT_ARROW)){
  survivor.changeAnimation("leftrun",survivorImg2);
  survivor.x = survivor.x - 11
}

if(keyDown(UP_ARROW)){
  survivor.changeAnimation("uprun",survivorImg3);
  survivor.y = survivor.y - 11
}

if(keyDown(RIGHT_ARROW)){
  survivor.changeAnimation("rightrun",survivorImg4);
  survivor.x = survivor.x + 11
 }

if(survivor.collide(carGroup)){
   gameState = END;  
}
  spawnCar();
}

//gameState Level END
if(gameState === END){

endBlock = createSprite(1350,700);
endBlock.addImage("image",blockImg)
  endBlock.scale = 3.3;

gameOver = createSprite(1350,600);
gameOver.addImage("image",gameOverImg);
  gameOver.scale = 5;

retry = createSprite(1350,1000);
retry.addImage("image",retryImg);
  retry.scale = 10;

if(mousePressedOver(retry)){
  reset();
}

}

  survivor.depth = ground2.depth;
  survivor.depth = survivor.depth + 1;  
  survivor.collide(wall1);
  survivor.collide(wall2);
  survivor.collide(wall3);
  survivor.collide(wall4);
  survivor.collide(wall5);
  edges = createEdgeSprites();

  drawSprites();

}

function spawnCar(){
  if(frameCount % 60 === 0){
   car = createSprite(200,200,20,20);
   car.addImage(carImg);
   car.x = survivor.x;
   car.y = 0; 
   car.scale = 5;
     car.velocityY = 20;
     carGroup.setLifetimeEach(10000000);
     carGroup.add(car);
     carGroup.collide(survivor);
    }
  }

function reset(){
  gameState = L2; 
    gameOver.visible = false;
    retry.visible = false;
    endBlock.visible = false;  
}

  

