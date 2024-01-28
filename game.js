


$(document).ready(function() {
    
    setup();
});
function setup(){

    var healthContainer = document.createElement("div");
    healthContainer.className = "healthContainer";
    var healthIcon=document.createElement("img");
    healthIcon.src="img/heart.png";
    healthIcon.className="healthIcon";
    healthContainer.appendChild(healthIcon);
document.getElementById("topBar").appendChild(healthContainer);
let health=3;

    var explodeAnimation = [
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image()
    ];
    explodeAnimation[5].src = "img/explode1.png";
    explodeAnimation[4].src = "img/explode2.png";
    explodeAnimation[3].src = "img/explode3.png";
    explodeAnimation[2].src = "img/explode4.png";
    explodeAnimation[1].src = "img/explode5.png";
    explodeAnimation[0].src = "img/explode6.png";


    var pointImg = [
        new Image(),
        new Image(),
        new Image(),
        new Image(),
    ];
    pointImg[0].src = "img/Garbage1.png";

    var score = 0;
    var ship = new Image();
    ship.src = "img/ship.gif";
    var asteroid = new Image();
    asteroid.src = "img/asteroid.png";
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let blink=false;
    let invulnerable=false;
    let maxY= window.screen.height-240;
    let maxX= window.screen.width- 75;
    maxY=maxY*.75;
    let BG=document.getElementById("background");
    let ctx=BG.getContext("2d");
    let FG=document.getElementById("foreground");
    let ctx2=FG.getContext("2d");
    BG.width=maxX;
    BG.height=maxY;
    FG.width=maxX/1.5;
    FG.height=maxY/1.5;
    var background = new Image();
    background.src = "img/BG.png";
    var foreground = new Image();
    foreground.src = "img/foreground.png";
    foreground.style.height="240px";
    let foregroundScrollSpeed=1;
    let foregroundPosition=0;
    let scrollSpeed=0.2;
    let BGPosition=0;
    let difficultyCounter=1;
    let shipRotation=90;
    let shipPosX=50;
    let shipPosY=450;


    let asteroids=[];
    let asteroidCount=0;
    let objectSpeedXMax=-5;
    let objectSpeedXMin=-1;
    let objectRotationMax=5;
    let objectRotationMin=-5;

    let pointCount=0;
    let points = [];


    var main = setInterval(function() {
        ctx.clearRect(0, 0, BG.width, BG.height);
        ctx2.clearRect(0, 0, FG.width, FG.height);

        

        
        ctx.drawImage(background, BGPosition, 0);
     // draw image 2
        ctx.drawImage(background, BGPosition+ BG.width, 0);

        ctx2.drawImage(foreground, foregroundPosition, -120);
        ctx2.drawImage(foreground, foregroundPosition+ foreground.width, -120);
        ctx2.drawImage(foreground, foregroundPosition+ foreground.width*2, -120);

        ctx2.drawImage(foreground, foregroundPosition, 510);
        ctx2.drawImage(foreground, foregroundPosition+ foreground.width, 510);
        ctx2.drawImage(foreground, foregroundPosition+ foreground.width*2, 510);
        
 
   
        foregroundPosition -= foregroundScrollSpeed;
        // update image width
        BGPosition -= scrollSpeed;
        
        if(-1*foregroundPosition >= foreground.width)
            foregroundPosition = 0;
        //resetting the images when the first image entirely exits the screen
        if (-1*BGPosition >= maxX)
            BGPosition = 0
    
    

    handleAsteroid();
    handlePoints();
    shipMovement();
        
    

        // document.body.appendChild(img);
    
    
    },10);

   var secondary= setInterval(function(){
        difficultyCounter+=1;
        let info=document.getElementsByClassName("info")[0];
        info.style.left="-50%";
        setTimeout(function(){
            info.remove();
            info.style.left="150%";
        document.getElementById("bottomBar").appendChild(info);
            setTimeout(function(){
                info.style.left="50%";
            },1500)
            
        },1500);
        

    },15000);
 var pointSpawn= setInterval(function(){
        if(pointCount<40){
            spawnPoints();
            pointCount+=1;
        }},5000);

    function shipMovement(){
//draw using canvas

        if(rightPressed) {
            shipPosX += 7;
            shipRotation=90;
        }
        else if(leftPressed) {
            shipPosX -= 7;
            shipRotation=-90;
        }
    if(upPressed) {
            shipPosY -= 7;
            if(rightPressed){
                shipRotation=45;
            }else if(leftPressed){
                shipRotation=-45;
            }else{
            shipRotation=0;}
        }
        else if(downPressed) {
            shipPosY+= 7;
            if(rightPressed){
                shipRotation=135;
            }else if(leftPressed){
               shipRotation=-135;
            }else{
            shipRotation=180;}
        }
        if(!blink){
        drawImage(ship, shipPosX, shipPosY,1, shipRotation);}
    }

    
    
    function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
    else if(e.keyCode == 38){
        upPressed = true;
    }
    else if(e.keyCode == 40){
        downPressed = true;
    }}
    
    function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
    else if(e.keyCode == 38){
        upPressed = false;
    }
    else if(e.keyCode == 40){
        downPressed = false;
    }}

    function handleAsteroid(){
        if(asteroidCount<difficultyCounter*3 && asteroidCount<20){
            spawnAsteroid();
            asteroidCount+=1;
        }
        for(let i=0; i<asteroids.length; i++){
            if(asteroids[i]['y']>maxY || asteroids[i]['y']<0){
                asteroids[i]['speedY']=-1*asteroids[i]['speedY'];
            }
            if(asteroids[i]['x']<-100){
                asteroids.splice(i,1);
                asteroidCount-=1;
            }else{
                if(asteroids[i]['explode']!=null){
                    
                    if(asteroids[i]['explode']<=0){
                        asteroids.splice(i,1);
                        asteroidCount-=1;

                    }else{
                        drawImage(explodeAnimation[Math.round(asteroids[i]['explode']/2)], asteroids[i]['x'], asteroids[i]['y'],asteroids[i]['scale'], asteroids[i]['rotation']);
                    asteroids[i]['explode']-=1;
                    }
                    
                }else{
                asteroids[i]['x']+=asteroids[i]['speedX'];
                asteroids[i]['y']+=asteroids[i]['speedY'];
                asteroids[i]['rotation']+=asteroids[i]['rotationSpeed'];
                drawImage(asteroid, asteroids[i]['x'], asteroids[i]['y'],asteroids[i]['scale'], asteroids[i]['rotation']);}
             }
            if(checkCollision(asteroids[i])&&!invulnerable){
                badCollide();
                asteroids[i]['explode']=12;
            }
        }
    }

    function spawnAsteroid(){
        let objectSpeedX=Math.floor(Math.random() * (objectSpeedXMax - objectSpeedXMin + 1) ) + objectSpeedXMin;
        let objectSpeedY=Math.floor(Math.random() * (objectSpeedXMax - objectSpeedXMin + 1) ) + objectSpeedXMin;
        let objectRotation=Math.floor(Math.random() * (objectRotationMax - objectRotationMin + 1) ) + objectRotationMin;
        let asteroidScale=Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
        let asteroidX=maxX;
        let asteroidY=Math.floor(Math.random() * (maxY - 0 + 1) ) + 0;
        asteroids.push({
            x:asteroidX,
            y:asteroidY,
            speedX:objectSpeedX,
            speedY:objectSpeedY,
            rotation:0,
            rotationSpeed:objectRotation,
            scale:asteroidScale,
            width:asteroid.width*asteroidScale,
            height:asteroid.height*asteroidScale
        });
    }

    function handlePoints(){
        for(let i=0; i<points.length; i++){
            if(points[i]['y']>maxY || points[i]['y']<0){
                points[i]['speedY']=-1*points[i]['speedY'];
            }
            if(points[i]['x']<-100){
                points.splice(i,1);
                pointCount-=1;
            }else{
                points[i]['x']+=points[i]['speedX'];
                points[i]['y']+=points[i]['speedY'];
                points[i]['rotation']+=points[i]['rotationSpeed'];
                drawImage(pointImg[points[i]['type']], points[i]['x'], points[i]['y'],points[i]['scale'], points[i]['rotation']);
            }
            if(checkCollision(points[i])){
                points.splice(i,1);
                pointCount-=1;
                score+=1;
            }
        }
    }

    function spawnPoints(){
        let objectSpeedX=Math.floor(Math.random() * (objectSpeedXMax - objectSpeedXMin + 1) ) + objectSpeedXMin;
        let objectSpeedY=Math.floor(Math.random() * (objectSpeedXMax - objectSpeedXMin + 1) ) + objectSpeedXMin;
        let objectRotation=Math.floor(Math.random() * (objectRotationMax - objectRotationMin + 1) ) + objectRotationMin;
        let pointScale=Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
        let pointX=maxX;
        let pointY=Math.floor(Math.random() * (maxY - 0 + 1) ) + 0;
        let pointType=Math.floor(Math.random() * (3 - 0 + 1) ) + 0;
        points.push({
            x:pointX,
            y:pointY,
            speedX:objectSpeedX,
            speedY:objectSpeedY,
            rotation:0,
            rotationSpeed:objectRotation,
            scale:pointScale,
            width:pointImg[pointType].width*pointScale,
            height:pointImg[pointType].height*pointScale,
            type:pointType
        });
    }


    function checkCollision(a){
      return a['x']<shipPosX+ship.width/2 && a['x']+a['width']>shipPosX-ship.width/2 && a['y']<shipPosY+ship.height/2 && a['y']+a['height']>shipPosY-ship.height/2;
    }


    // function checkCollision(a, b){
    //     var aRect = a.getBoundingClientRect();
    //     var bRect = b.getBoundingClientRect();
    
    //     return !(
    //         ((aRect.top + aRect.height) < (bRect.top)) ||
    //         (aRect.top > (bRect.top + bRect.height)) ||
    //         ((aRect.left + aRect.width) < bRect.left) ||
    //         (aRect.left > (bRect.left + bRect.width))
    //     );
    // }

    function badCollide(){
        health-=1;
            let healthContainer=document.getElementsByClassName("healthContainer")[0];
            if(health==2){
                healthContainer.style.width=5+"vw";
            }else if(health==1){   
                healthContainer.style.width=2.7+"vw";
            }else
        if(health==0){
            healthContainer.style.width=0+"vw";
            gameOver();}

        rightPressed=false;
        leftPressed=false;
        upPressed=false;
        downPressed=false;
        document.onkeydown=null;
        document.onkeyup=null;
        invulnerable=true;
        var temp=setInterval(function(){
            blink=!blink;
        },100);
        setTimeout(function(){
            document.onkeydown = keyDownHandler;
            document.onkeyup = keyUpHandler;
        },500);
        setTimeout(function(){
            invulnerable=false;
            clearInterval(temp);
        },2000);
    }
    function drawImage(image, x, y, scale, rotation){
        ctx.save();
        rotation=rotation*Math.PI/180;
        ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
        ctx.rotate(rotation);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    } 
    
    function gameOver(){
        clearInterval(main);
        clearInterval(secondary);
        clearInterval(pointSpawn);
        let gameOver=document.createElement("div");
        gameOver.className="gameOver";
        let gameOverText=document.createElement("h1");
        gameOverText.innerHTML="GAME OVER";
        gameOver.appendChild(gameOverText);
        let result=document.createElement("h2");
        result.innerHTML="Score: "+score;
        gameOver.appendChild(result);
        gameOver.style.zIndex=100;
        document.body.appendChild(gameOver);
        let restart=document.createElement("button");
        restart.className="button-59";
        restart.innerHTML="RESTART";
        restart.onclick=function(){
            location.reload();
        }
        gameOver.appendChild(restart);
    }
}