var gameState=1;
var background1,backgroundImg;
var man, man_running, man_collided;
var bat, ba_t;
var spiders,spider_s,SpiderGroup;
var skull,skul_l,SkullGroup;
var plant,pla_nt,plantGroup;
var sound;
var score;
var gameOverImg,gameOver


function preload(){ 
  man_running=loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png");
 man_collided=loadAnimation("man_collided.png");
 backgroundImg=loadImage("BG4.jpg")
 ba_t=loadAnimation("bat_1.png","bat_2.png","bat_3.png","bat_4.png");
 spider_s=loadImage("spider4.png");
skul_l=loadImage("skull3.png");
pla_nt=loadImage("Flesh_shrub.png");
sound=loadSound("Bats Sound.mp3");
gameOverImg=loadImage("Game_Over.png")
}



function setup() {
createCanvas(1200,680);

  score=0
  ground=createSprite(600,680,1200,10); 
  ground.x = ground.width /2;
  background1=createSprite(900,350,1200,20);
  background1.addImage(backgroundImg)
  background1.x = background1.width /2;
  background1.scale=1

  bat = createSprite(135,470,100,100);
  bat.addAnimation("bat",ba_t)
  bat.setCollider("circle",0,0,40)
  bat.scale=0.5;
  // bat.debug=true;
  
  man=createSprite(300,680,30,20);
  man.addAnimation("run",man_running);
  man.addAnimation("stop",man_collided)
  man.setCollider("rectangle",0,0,man.width-10,man.height-20)
  man.scale=0.8;

 // man.debug=true

  

SpiderGroup=new Group();
SkullGroup=new Group();
plantGroup=new Group();
  
}




function draw(){
  background("cyan"); 
  console.log(man.y)

if(gameState===1){
        background1.velocityX=-2;
        if (background1.x < 560){
            background1.x = background1.width/2;
          } 
          score=Math.round(score+getFrameRate()/60);

          sound.play();

      if(keyDown("space") && man.y>=569){
      man.velocityY=-12; 
      }
      man.velocityY=man.velocityY+0.4;

      bat.y=man.y-85;

      spawnSpider();
      spawnSkull();
      spawnPlant();

      if(SkullGroup.isTouching(man) || plantGroup.isTouching(man)){
        gameState=2;
      }
}

else if (gameState===2){
  background1.velocityX=0;
  ground.velocityX=0;
  sound.stop();
  man.changeAnimation("stop",man_collided);
  bat.velocityX=5;
  bat.collide(man);
  SpiderGroup.setVelocityXEach(0);
  SkullGroup.setVelocityXEach(0);
  plantGroup.setVelocityXEach(0);
  SkullGroup.setLifetimeEach(-1)
  SpiderGroup.setLifetimeEach(-1)
  plantGroup.setLifetimeEach(-1)
  man.velocityY=0
  gameOver=createSprite(600,340)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.8

}
man.collide(ground); 
drawSprites();  

textSize(25)
stroke("white")
fill("yellow")
text("Survival Time:"+score,60,100)
  
}

 

function spawnSpider(){
if(frameCount% 200 === 0){
spider=createSprite(1200,80,30,20);
spider.depth=man.depth-1;
spider.addImage(spider_s);
spider.scale=1;
spider.velocityX=-5;
spider.lifetime=380;
SpiderGroup.add(spider);
}
}
  
function spawnSkull(){
if(frameCount% 150 === 0){
skull=createSprite(1200,650,30,20);
skull.addImage(skul_l);
skull.scale=0.4;
skull.velocityX=-5;
skull.lifetime=240;
SkullGroup.add(skull);
}
}

function spawnPlant(){
if(frameCount% 230 === 0){
plant=createSprite(1200,650,30,20);
plant.addImage(pla_nt);
plant.scale=0.4;
plant.velocityX=-5;
plant.lifetime=240;
plantGroup.add(plant);
}
}