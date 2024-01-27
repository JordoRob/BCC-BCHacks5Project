


$(document).ready(function() {

    setup();
});
function setup(){
    let img = document.createElement("img");
    img.src = "img/ship.png";
    img.id = "ship";
    img.style.position = "absolute";
    img.style.left = "0px";
    img.style.bottom = "0px";
    img.style.width = "75px";
    img.style.zIndex = "10";
    let gameArea=document.getElementById("gameArea");
    gameArea.appendChild(img);
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let maxY= window.screen.height-240;
    let maxX= window.screen.width- 75;
    maxY=maxY*.75;
    let BG=document.getElementById("background");
    let ctx=BG.getContext("2d");
    BG.width=maxX;
    BG.height=maxY;
    var background = new Image();
    background.src = "img/BG.png";
    
    let scrollSpeed=1;
    let BGPosition=0;
    let ship=document.getElementById("ship");
    let asteroids=[];
    let asteroidCount=0;
    let difficultyCounter=1;
    let asteroidSpeedXMin=-5;
    let asteroidSpeedXMax=5;
    let asteroidSizeMin=25;
    let asteroidSizeMax=100;
    let asteroidRotationMin=1;
    let asteroidRotationMax=5;


    setInterval(function() {

        handleAsteroid();

        ctx.drawImage(background, BGPosition, 0);
 
        // draw image 2
        ctx.drawImage(background, BGPosition+ BG.width, 0);
 
        // update image height
        BGPosition -= scrollSpeed;
 
        //resetting the images when the first image entirely exits the screen
        if (-1*BGPosition >= maxX)
            BGPosition = 0
    
    

    
        shipMovement();
        
    

        // document.body.appendChild(img);
    
    
    },10);

    setInterval(function(){
        difficultyCounter+=1;
        let info=document.getElementsByClassName("info")[0];
        info.style.left="-50%";
        setTimeout(function(){
            info.remove();
            info.style.left="150%";
        document.getElementsByClassName("foreground")[0].appendChild(info);
            setTimeout(function(){
                info.style.left="50%";
            },1500)
            
        },1500);
        

    },15000);


    function shipMovement(){
        let x = parseInt(ship.style.left);
        let y = parseInt(ship.style.bottom);
        if(rightPressed) {
            x += 7;
            ship.style.transform = "rotate(90deg)";
        }
        else if(leftPressed) {
            x -= 7;
            ship.style.transform = "rotate(-90deg)";
        }
    if(upPressed) {
            y += 7;
            if(rightPressed){
                ship.style.transform = "rotate(45deg)";
            }else if(leftPressed){
                ship.style.transform = "rotate(-45deg)";
            }else{
            ship.style.transform = "rotate(0deg)";}
        }
        else if(downPressed) {
            y -= 7;
            if(rightPressed){
                ship.style.transform = "rotate(135deg)";
            }else if(leftPressed){
                ship.style.transform = "rotate(-135deg)";
            }else{
            ship.style.transform = "rotate(180deg)";}
        }
    
        if (x < 0) {
            x = 0;
        }
        if (x > maxX) {
            x = maxX;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > maxY) {
            y = maxY;
        }
        ship.style.left = x + "px";
        ship.style.bottom = y + "px";
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
        for(let i=0;i<asteroids.length;i++){
            let asteroid=asteroids[i][0];
            let asteroidSpeedx=asteroids[i][1];
            let asteroidSpeedy=asteroids[i][2];
            let asteroidRotation=asteroids[i][3];
            let currentRotation=parseInt(asteroid.style.transform.replace("rotate(","").replace("deg)",""));
            let x = parseInt(asteroid.style.left);
            let y = parseInt(asteroid.style.bottom);
            x+=asteroidSpeedx;
            y+=asteroidSpeedy;
            asteroidRotation+=currentRotation;
            asteroid.style.transform = "rotate("+asteroidRotation+"deg)";
            asteroid.style.left=x+"px";
            asteroid.style.bottom=y+"px";
            if(x<-200){
                asteroid.remove();
                asteroidCount-=1;
                asteroids.splice(i,1);
            }
            if(x>maxX+100){
                asteroid.remove();
                asteroidCount-=1;
                asteroids.splice(i,1);
            }
//bounce off the walls
            if(y<0){
                asteroidSpeedy*=-1;
                asteroids[i][2]=asteroidSpeedy;
            }
            if(y>maxY){
                asteroidSpeedy*=-1;
                asteroids[i][2]=asteroidSpeedy;
            }
            if(checkCollision(asteroid,ship)){
                if(!ship.classList.contains("blink")){
                asteroid.remove();
                asteroids.splice(i,1);
                badCollide();
                }
            }

        }
        if(asteroidCount<difficultyCounter*3&&asteroidCount<30){
            spawnAsteroid();
        }

    }

    function spawnAsteroid(){
        let asteroid=document.createElement("img");
        asteroid.src="img/asteroid.png";
        asteroid.classList.add("asteroid");
        asteroid.style.position="absolute";
        asteroid.style.left=maxX+100+"px";
        asteroid.style.bottom=Math.floor(Math.random() * maxY) + 1+"px";
        asteroid.style.width=Math.floor(Math.random() * asteroidSizeMax) + asteroidSizeMin+"px";
        asteroid.style.zIndex="10";


        let asteroidRotation=(Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random() * asteroidRotationMax) + asteroidRotationMin);

        asteroid.style.transform = "rotate("+asteroidRotation+"deg)";
        let asteroidSpeedx=Math.floor(Math.random() * asteroidSpeedXMax) + asteroidSpeedXMin;
        let asteroidSpeedy=(Math.round(Math.random()) * 2 - 1);
        asteroids.push([asteroid,asteroidSpeedx,asteroidSpeedy,asteroidRotation]);
        asteroidCount+=1;
        let gameArea=document.getElementById("gameArea");
        gameArea.appendChild(asteroid);
    }

    function checkCollision(a, b){
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();
    
        return !(
            ((aRect.top + aRect.height) < (bRect.top)) ||
            (aRect.top > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width) < bRect.left) ||
            (aRect.left > (bRect.left + bRect.width))
        );
    }

    function badCollide(){
        // let health=document.getElementById("health");
        // let healthValue=parseInt(health.innerHTML);
        // healthValue-=1;
        // health.innerHTML=healthValue;
        // if(healthValue==0){
        //     gameOver();
        // }else
        rightPressed=false;
        leftPressed=false;
        upPressed=false;
        downPressed=false;
        document.onkeydown=null;
        document.onkeyup=null;
        ship.classList.add("blink");
        setTimeout(function(){
            document.onkeydown = keyDownHandler;
            document.onkeyup = keyUpHandler;
        },1000);
        setTimeout(function(){
            ship.classList.remove("blink");
            document.onkeydown = keyDownHandler;
            document.onkeyup = keyUpHandler;
        },3000);
    }
}