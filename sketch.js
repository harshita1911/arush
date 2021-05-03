
var JUNGLE = 1;
var UNDERWATER = 2;
var SPACE = 3;
var END = 4;
var gameState = JUNGLE;

var ground, invisibleGround, groundimg

var boy, boypose1, boypose2, boypose3, boypose4, boypose5, boycollided
var shark, sharkimg1
var lion, tigerimg1, tigerimg2
var asteroid, asteroidimg
var spacebackground, spacebackgroundimg
var junglebackground, junglebackgroundimg
var underwaterbackground, underwaterbackgroundimg
var obstacle1, obstacle2, obstacle3, obstacle4, obstaclesGroup
var jumpsound, collidedsound

var score=0;

var gameOver, gameOverimg, restart, restartimg;           


function preload(){
boypose = loadAnimation("images/firstposeofcharacterrunning.png","images/secondposeofcharacterrunning.png","images/thirdposeofchraracterrunning.png","images/fourthposeofcharacterrunning.png","images/fifthposeofcharacterrunning.png")
boycollided = loadImage("images/collidedboyimage.png");

obstacle1 = loadImage("images/obstacle1image.png")
obstacle2 = loadImage("images/obstaclce2image.png")
obstacle3 = loadImage("images/obstacle2image.png")
obstacle4 = loadImage("images/obstacle3image.png")

asteroidimg = loadImage("images/asteroidforgamecropped.png")

tigerpose = loadAnimation("images/tiger1image.png","images/tiger2image.png")

sharkpose = loadImage("images/sharkimage1.png")

junglebackgroundimg = loadImage("images/junglebackground.jpg")
spacebackgroundimg = loadImage("images/spacebackground.jpg")
underwaterbackgroundimg = loadImage("images/underwaterbackgroundforgame.png")

playimg = loadImage("images/playbuttonforgame.png")

restartimg = loadImage("images/restartimageforgamecropped.png")
gameOverimg = loadImage("images/gameoverimageforgamecropped.png")

jumpSound = loadSound("sounds/jumpSound.mp3")
collidedSound = loadSound("sounds/collidedSound.mp3")
}

function setup(){
createCanvas(windowWidth, windowHeight);

background = createSprite(windowWidth-8000, windowHeight-300, width,height)
background.velocityX = -4

boy = createSprite(200,520,50,50)
boy.addAnimation("boy", boypose);
boy.addImage("collided", boycollided);
boy.setCollider('circle',0,0,100)
boy.scale = 0.35

invisibleGround = createSprite(width/2,height-10,width,20);  
invisibleGround.shapeColor = "#f4cbaa";

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverimg); 
restart = createSprite(width/2,height/1.8);
restart.addImage(restartimg);
gameOver.scale = 0.7;
restart.scale = 0.1;
gameOver.visible = false;
restart.visible = false; 

obstaclesGroup = new Group();
hangingobstaclesGroup = new Group();
spaceobstaclesGroup = new Group()

score = 0;
}

function draw(){
if (gameState===JUNGLE){
    background.addImage("background", junglebackgroundimg)

    fill("yellow")
    textSize(18)
    text("Score: "+ score, 1100,50);
    score = score + Math.round(getFrameRate()/60);

    invisibleGround.visible = false
    invisibleGround.velocityX = -(6 + 3*score/100);

    background.velocityX = -(6 + 3*score/100);

    if (background.x < 0){
      background.x = background.width/2;
    }

    if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-90) {
      jumpSound.play()
      boy.velocityY = -10;
    }
    

    boy.velocityY = boy.velocityY + 0.8;


  
    boy.collide(invisibleGround);


    gameOver.visible = false;
    restart.visible = false; 

    if(score > 60){
    gameState = UNDERWATER
    }
    

    spawnObstacles();
    spawnHangingObstacles();

    if(obstaclesGroup.isTouching(boy) || spaceobstaclesGroup.isTouching(boy) || hangingobstaclesGroup.isTouching(boy)){
        collidedSound.play()
        gameState = END;
        
    }
  }

  if (gameState===UNDERWATER){
    background.addImage("background",underwaterbackgroundimg)
    
    fill("black")
    textSize(18)
    text("Score: "+ score, 1100,50);
    score = score + Math.round(getFrameRate()/60);

    invisibleGround.visible = false
    invisibleGround.velocityX = -(6 + 3*score/100);

    background.velocityX = -(6 + 3*score/100);

    if (background.x < 0){
      background.x = background.width/2;
    }

    if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-90) {
      jumpSound.play()
      boy.velocityY = -10;
    }
    

    boy.velocityY = boy.velocityY + 0.8;

    shark = createSprite(75,520,50,50)
    shark.addImage(sharkpose);
    shark.setCollider('circle',0,0,10)
    shark.scale = 0.35
  
    //if(shark.isTouching(boy)){
        //
    //}
  
  
    boy.collide(invisibleGround);

    gameOver.visible = false;
restart.visible = false; 

    if(score > 40){
      gameState = SPACE
      }

    spawnObstacles();
    spawnHangingObstacles();
    

    if(obstaclesGroup || spaceobstaclesGroup || hangingobstaclesGroup.isTouching(boy)){
        collidedSound.play()
        gameState = END;
        
    }
  }

  if (gameState===SPACE){
    background.addImage("background",spacebackgroundimg)
    fill("yellow")
    textSize(18)
    text("Score: "+ score, 1100,50);
    score = score + Math.round(getFrameRate()/60);

    invisibleGround.visible = false
    invisibleGround.velocityX = -(6 + 3*score/100);

    background.velocityX = -(6 + 3*score/100);
    if (background.x < 0){
      background.x = background.width/2;
    }
  
    if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-90) {
      jumpSound.play()
      boy.velocityY = -10;
    }
    

    boy.velocityY = boy.velocityY + 0.8;

  
    boy.collide(invisibleGround);

    gameOver.visible = false;
restart.visible = false; 

    if(score > 4500){
      gameState = JUNGLE
      }

    spawnObstacles();
    spawnSpaceObstacles();


    if(obstaclesGroup || spaceobstaclesGroup || hangingobstaclesGroup.isTouching(boy)){
        collidedSound.play()
        gameState = END;
        
    }
  }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        gameOver.scale = 0.7
        restart.scale = 0.2 
        
        invisibleGround.velocityX = 0;
        boy.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        hangingobstaclesGroup.setVelocityXEach(0);
        spaceobstaclesGroup.setVelocityXEach(0);
        
        boy.addImage("collided",boycollided);

        obstaclesGroup.setLifetimeEach(-1)
        hangingobstaclesGroup.setLifetimeEach(-1)
        spaceobstaclesGroup.setLifetimeEach(-1)
        
        if(mousePressedOver(restart)) {
          reset();
        }
      
        

      drawSprites()
}
}

  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-25,20,30);
      obstacle.setCollider('circle',0,0,45)
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle3);
                break;
        case 3: obstacle.addImage(obstacle4);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        default: break;
      }   
      obstacle.scale = 0.45;
      obstacle.lifetime = 300;
      obstacle.depth = boy.depth;
      boy.depth +=1;
      obstaclesGroup.add(obstacle);
    }
  }  

  function spawnHangingObstacles(){
    if(frameCount % 270 === 0) {
      var hangingObstacle = createSprite(600,height-255,20,30);
      hangingObstacle.setCollider('circle',0,0,45)

      hangingObstacle.velocityX = -(6 + 3*score/100);
      hangingObstacle.addImage(obstacle2)
      hangingObstacle.scale = 0.45;
      hangingObstacle.lifetime = 300;
      hangingObstacle.depth = boy.depth;
      boy.depth +=1;
      hangingobstaclesGroup.add(hangingObstacle);
    }
  }

  function spawnSpaceObstacles() {
    if(frameCount % 40 === 0) {
      var asteroid = createSprite(600,height-35,20,30);
      asteroid.setCollider('circle',0,0,45)

      asteroid.velocityX = -(6 + 3*score/100);
      asteroid.addImage(asteroidimg)
      asteroid.scale = 0.45;
      asteroid.lifetime = 300;
      asteroid.depth = boy.depth;
      boy.depth +=1;
      spaceobstaclesGroup.add(asteroid);
    }
  }

  function reset(){
  gameState = JUNGLE;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  hangingobstaclesGroup.destroyEach();
  spaceobstaclesGroup.destroyEach();
  
  boy.changeAnimation("running",boypose);
  
  score = 0;
  }

  //need to add tiger and figure out why animation isn't working
  //need to see if shark is working 
  //need to add beginning gamestate, like starting screen