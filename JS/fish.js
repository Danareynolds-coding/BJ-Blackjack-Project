// define variables
let score = 0;
let gameFrame = 0;  //can attatch events to this frame
         
// set up canvas //ctx= context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500; 
ctx.font = '50px Georgia';

// setup Mouse =coordinate x,y  /2(centers mouse)
let canvasPosition = canvas.getBoundingClientRect();  //size & coord
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click:false
}

canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;      //sets new coord
    mouse.y = event.y - canvasPosition.top;       //left for down
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;

})

//setup player
class Player{               //initializes player
    constructor(){
      this.x = canvas.width;          //center player
      this.y = canvas.height/2;  
      this.radius = 50;               // circle represent player  
      this.angle = 0;                 // to turn player
      this.frameX = 0; 
      this.frameY = 0; 
      this.frame = 0;         //tracks numb of frames on sheet
      this.spriteWidth = 498;              //width of single frame
      this.spriteHeight = 327;
    }                    //updates coord. , d =distance
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx/20;      //moves left and right
        }                         //***/20 to slow down move**
        if (mouse.y != this.y){
            this.y -= dy/20;       //moves up and down
        }
    }                //draw method renders graphics on canvas
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.2;    //to see direction
            ctx.beginPath();        //start move
            ctx.moveTo(this.x, this.y);  //start point toward mouse
            ctx.lineTo(mouse.x, mouse.y); //end point (mouse)
            ctx.stroke()            //connects two points
        }
        ctx.fillStyle = 'red';        //circle to repres fish
        ctx.beginPath();               //0= start angle
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        // 2 archs make circle
        ctx.fill();                     //fill to draw it
        ctx.closePath();               //finishes circle

    }
}
const player = new Player();

// *************Bubbles************************
// set up bubbles
const bubblesArray = [];
class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width; 
        this.y = canvas.height + 100;  //100 to make sure past edge
        this.radius = 50;               //size
        this.speed = Math.random() * 5 + 1;     //random speed
        this.distance;  
        this.counted = false;     //dist between bubble & player;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        // ^^if else sound 1 or 2  
    }
    update(){
        this.y -= this.speed; 
        const dx = this.x - player.x;  //dist of player & bubble
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        }
    draw(){
        ctx.fillStyle = 'blue';     //create bubbles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src='Plop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop1.src='Pop1.ogg';


function handleBubbles(){
    if(gameFrame % 50 == 0){    //run code every 50 frames
        bubblesArray.push(new Bubble());    //new bubble    
    }                                        //more bubbles
    for (let i = 0; i < bubblesArray.length; i++){ 
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }                               // to stop blinking
    for (let i = 0; i < bubblesArray.length; i++){ 
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){   
            bubblesArray.splice(i, 1);  //so not too many
        }                       // if collision
        if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius){ 
            //count bubble 1 time and then remove     
            if(!bubblesArray[i].counted){  
                if (bubblesArray[i].sound == 'sound1') {
                    bubblePop1.play();
                } else{
                    bubblePop2.play();
                }    
                score++;
                bubblesArray[i].counted = true; 
        }
      }
    }    
}
  //^^if past top of canvas and  also to make sure above edge
// *************Animation**************
//create animation//movement of fish /clearRect=clears area on canvas movement trail/ 

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();        //new bubbles
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText(`score:` + score, 10, 50);  //10&50 position/from 7
    gameFrame++;                  
    requestAnimationFrame(animate); 
}     
animate();
//function calls itself over and over- recursion

