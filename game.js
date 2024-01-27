


$(document).ready(function() {
    let img = document.createElement("img");
    img.src = "img/ship.png";
    img.id = "ship";
    img.style.position = "absolute";
    img.style.left = "0px";
    img.style.bottom = "0px";
    img.style.width = "75px";
    document.body.appendChild(img);
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let ship=document.getElementById("ship");
    let maxY= window.screen.height-150;
    let maxX= window.screen.width- 75;
    
    
    
    setInterval(function() {
    
    
    
        let x = parseInt(ship.style.left);
        let y = parseInt(ship.style.bottom);
    
        if(rightPressed) {
            x += 7;
        }
        else if(leftPressed) {
            x -= 7;
        }
    if(upPressed) {
            y += 7;
        }
        else if(downPressed) {
            y -= 7;
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
        // document.body.appendChild(img);
    
    
    },10);
    
    
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
    });