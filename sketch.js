var path,pathImageStart,pathImagePlay

var gameState="play";

var startButton, startButtonImage;

var backgroundImage;

var playerCar,playerCarImage;


var carImage1,carImage2,carImage3,carImage4, car;

var carGroup

var playerCarLives=3;

var score=0;

var bgmusic

var carsound, partyGIF,endImage

function preload(){

    pathImageStart = loadImage("images/start.jpg")

    startButtonImage = loadImage("images/STARt_BUTTON.png")

    pathImagePlay = loadImage("images/ROAD.png")
    backgroundImage= loadImage("images/FOREST_BACKGROUND.jpg")
    playerCarImage= loadImage("images/PC_CAR.png")

    carImage1= loadImage("images/CAR_1.png")
    carImage2= loadImage("images/CAR_2.png")
    carImage3= loadImage("images/CAR_3.png")
    carImage4= loadImage("images/CAR_4.png")

    bgmusic= loadSound("sounds/Game-Menu.mp3");

    carsound= loadSound("sounds/Surreal-Chase.mp3")

    partyGIF= loadImage("images/PARTY_POPPERS.gif");
    endImage= loadImage("images/END_IMAGE.jpg");

}

function setup(){
    createCanvas(1200,700)

    path= createSprite(600,350);
    path.addImage(pathImageStart);
    path.scale=1.9

    startButton= createSprite(600,630)
    startButton.addImage(startButtonImage);
    startButton.visible=false;
    startButton.scale=0.2


    playerCar= createSprite(330,300)
    playerCar.addImage(playerCarImage);
    playerCar.scale=0.2
    //playerCar.velocityY=-2

    if(gameState==="play"){
    path.velocityY=4;
    }

    carGroup= new Group;
    
    console.log("fr: "+getFrameRate())

}

function draw(){
    background("black");

    if (gameState==="start"){
        drawSprites();

        textSize(80);
        fill("red");
        text("TITLE",550, 150);

        startButton.visible=true;
        playerCar.visible=false;

        if(mousePressedOver(startButton)){
            gameState="play";

         }
    
    }

    if(gameState==="play"){
        
        background(backgroundImage)

       // bgmusic.play();


        path.addImage(pathImagePlay);
        path.scale=1;

        if(path.y>500){
            path.y=350
        }

        startButton.visible=false;
        playerCar.visible=true

        //gameCamera.x=600;
        //gameCamera.y=playerCar.y;
        
        if(keyDown(RIGHT_ARROW)){
            playerCar.x=playerCar.x+15;
        }
    
        if(keyDown(LEFT_ARROW)){
            playerCar.x=playerCar.x-15;
        }

        if(playerCar.x<290 ||playerCar.x>920){
            playerCar.x=660
        }

        if(keyDown(UP_ARROW) && path.velocityY<=10){
            path.velocityY=path.velocityY+1
            //carsound.play();
        }

        if(keyDown(DOWN_ARROW)){

            if(path.velocityY>4){
                path.velocityY=path.velocityY-1
            }
            else{
                path.velocityY=4
            }
        }
        if(score%10===0 && score>0){
            image(partyGIF,600, 350);

            
        }

        if(playerCar.isTouching(carGroup)){
            //gameState="end";
            carGroup.destroyEach()
            playerCarLives=playerCarLives-1
            console.log(gameState)

            if(playerCarLives>0){
                playerCar.x=600
                playerCar.y=300
            }
            else{
                gameState='end'
            }
        }
    
       
        spawnCars();
        drawSprites();
        
        fill("white")
        textSize(20)
        text("SCORE="+score,1050,100)
        score=score+Math.round(getFrameRate()/60);
//console.log(getFrameRate()/80)
        fill("white")
        textSize(20)
        text("LIVES="+playerCarLives,1050,130)

        
    }
     if(gameState==="end"){
         carGroup.setVelocityYEach(0);
         background(endImage)
         path.velocityY=0
         fill(rgb(0, 255, 255))
         stroke(20)
         textFont("Times New Roman");
         textSize(40);
         text("THE END",530, 350);
         carGroup.destroyEach();
         console.log("ended")

         fill(rgb(0, 255, 255))
         stroke(20)
         textFont("Times New Roman");
         textSize(40);
         text("Reload the page to play again!",400, 200);

         //if (keyDown('R')){
           //  gameState='play';
         //}
         

        //drawSprites(); 
     } 
}

function spawnCars(){
    if(frameCount%50===0){
        car= createSprite(660,600)
        var randomNum=Math.round(random(1,4))
        switch(randomNum){
            case 1:
                car.addImage(carImage1)
                car.scale=0.15;
                break ;
            case 2:
                car.addImage(carImage2)
                car.scale=0.050;
                break;
            case 3:
                car.addImage(carImage3)
                car.scale=0.15;
                break;
            case 4:
                car.addImage(carImage4)
                car.scale=0.14;
                break;
        }
        car.velocityY=-10;

        carGroup.add(car);
        car.x=Math.round(random(290,920))
        car.lifetime= 400;

        if(score%50===0 && score>0){
            car.velocityY=car.velocityY+3
            path.velocityY=path.velocityY+3
        }
        
    }
}