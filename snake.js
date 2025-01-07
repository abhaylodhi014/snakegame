// game constant
let board = document.getElementById('board')
let speed = 5 ;
let inputDir   = {x : 0 , y:0};
const foodsound = new Audio('food.mp3');
let food = {x:5 , y:5};
const gameoversound = new Audio('gameover.wav');
const startsound = new Audio('spooky.mp3');
const bgsound = new Audio('bgmusic.wav')
const movesound = new Audio('moving.wav')
let lastPaintTime = 0 ;
startsound.play();
// let scoreboard = document.getElementById('scoreboard')
let snakeArr = [
    {x : 9 , y:9}
]
let score = 0;
let hiscoreval =0 ;
// game function
function main(ctime){
    window.requestAnimationFrame(main);
    // ye apne ander ek method leta hai
    // yaha per main functioin bar bar call hota rahega like infinite loop (game loop)  
  if((ctime - lastPaintTime)/1000 <  1/speed ){
    return ;
  }
   lastPaintTime = ctime;
   gameEngine();
}


function isCollide(snake){ 
    // if snake collide with own self 
 for (let index = 1 ; index < snake.length; index++) {
    if(snake[0].x === snake[index].x && snake[0].y === snake[index].y){
   
        return true ;
    }
}
//if sanke collide with wall
 if((snake[0].x >=18 || snake[0].x<=0) || (snake[0].y >=18 || snake[0].y<=0)){
  
    return true;
 }
    return false;
 
}

function gameEngine(){   
// part 1 : updating the snake array & food 
if(isCollide(snakeArr)){
  gameoversound.play()
    bgsound.pause();
  
    inputDir= {x: 0 , y:1}

    alert("Game Over press any key to play again");
    snakeArr = [{x:9 , y:9}];
  
    score = 0 ;
    gameoversound.pause()
}
// if snake eat the food 
// if snake head cordinate and food cordinate are equal its means snake eat the food
if(snakeArr[0].y  === food.y && snakeArr[0].x === food.x  ){ 
    foodsound.play();
    score += 1 ;
    scoreboard.innerHTML= `Score: ${score}`;
    if(score > hiscore){
       hiscoreval = score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
            highscoreboard.innerHTML = `HighScore: ${hiscoreval}`
        }
    
   
snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y })
// unshift arr ke starting mai element add kar dega 
// basiclay jab snake food lega tu wahi uske age* ek or part add ho jayga 

let a =2 ;
let b = 16 ; 
// now we need to dispaly food at random placeses 
food = { x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random()) };

}

// Math.round(a + (b-a)*Math.random())  ye fun a, b mai koi ek random no. dega

//moving the snake :: yaha per hum kya karege ke har block ko ek position aage kar dege or head ko uski direction mai age kar dege

for(let i = snakeArr.length -2 ; i>=0 ; i--){
    snakeArr[i+1] = {...snakeArr[i]};//create new object
    // agar sedhe = laga diya to ho sakta hai sare element ek he point ko focus kare 
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

// part 2 : display the  snake and food
// clear the board 
 board.innerHTML = "";

//  display the snake
 snakeArr.forEach((e , index) => {
    
 // sare object jo snakearr mai hai
 let snakeElement = document.createElement('div')   ;
 snakeElement.style.gridRowStart = e.y ;
 snakeElement.style.gridColumnStart = e.x ;
 snakeElement.classList.add('snake')//use snake class 
if(index === 0 ){
    snakeElement.classList.add('head')
}
 board.appendChild(snakeElement);
 });

 // Display the food
let foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food'); // Use 'food' class
board.appendChild(foodElement);

}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval =0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
}
else{

    highscoreboard.innerHTML = `HighScore: ${hiscore}`
}
// Start the game loop
window.requestAnimationFrame(main);

window.addEventListener('keydown' , e =>{
    startsound.pause();
    bgsound.play();
    inputDir = {x:0 , y:1} //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir = {x: 0, y: -1}; // Move up
            break;
        case "ArrowDown":
            inputDir = {x: 0, y: 1}; // Move down
            break;
        case "ArrowLeft":
            inputDir = {x: -1, y: 0}; // Move left
            break;
        case "ArrowRight":
            inputDir = {x: 1, y: 0}; // Move right
            break;
        default:
            console.log("Invalid key pressed:", e.key);
    }
})