
var monkey , monkey_running,ground;
var banana ,bananaImg, obs, obsImage;
var bananaGroup, obsGroup;
var survivalTime=0;
var count=0;

function preload(){
  
  backgroundImage=loadImage("9ca8fe90a4080517154aafcbf29280ae.jpg")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg  = loadImage("banana.png");
  obsImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(600,600);
  
  backgroundIm = createSprite(300,250,0,0);
  backgroundIm.addImage(backgroundImage);
  backgroundIm.velocityX=-4
  backgroundIm.scale = 1;
  
  monkey=createSprite(150,399,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(250,450,700,10);
  //ground.velocityX=-4;
  ground.shapeColor="green"
  ground.visible= false;
  
  bananaGroup= new Group();
  obsGroup= new Group();
  
  
}



function draw() {
  

   
  
  
  if(backgroundIm.x<200){
    backgroundIm.x=backgroundIm.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-15;
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    survivalTime=survivalTime+1;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(obsGroup.isTouching(monkey)){
  obsGroup.destroyEach();
  monkey.scale=0.1;
  count=count+1;
  }
  
 
  monkey.collide(ground);
  
  obstacles();
  food();
  drawSprites();
  
   if(count===5){
    bananaGroup.destroyEach();
    obsGroup.destroyEach();
    monkey.destroy();
    backgroundIm.velocityX=-0;
    textSize(30)
    fill("black")
    text("Game Over",200,300);
  }
  
  //survivalTime=Math.round(frameCount%frameRate())
  textSize(20);
  fill("black")
  text("Survival Time: "+survivalTime,100,80)
  
  text("Death count: "+count,390,80);
}

function food(){
  
  if(frameCount%80===0){
    banana=createSprite(550,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImg);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=200;
     bananaGroup.add(banana);
  }
  
  
}

function obstacles(){
  if(frameCount%150===0){
    obs=createSprite(550,415,10,10);
    obs.addImage(obsImage);
    obs.velocityX=-4;
    obs.scale=0.2;
    obs.lifetime=200;
    obsGroup.add(obs);
  }
}

