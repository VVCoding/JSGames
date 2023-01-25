const grid = document.querySelector(".grid");
const scoredisplay = document.querySelector("#score")
const blockwidth = 100;
const blockheight = 20;
const boardheight = 300;
const boardwidth = 560;

const userStart = [230,10];
const userCurrPos = userStart;

const ballstart = [270,30];
let ballCurrPos = ballstart;
const ballDiameter = 20;

let xDirection = -2;
let yDirection = 2;

let score = 0;

let timerId;
//Block Class
class Block{
    constructor(xAxis,yAxis){
        this.bottomleft = [xAxis,yAxis];
        this.bottomright = [xAxis+blockwidth, yAxis];
        this.topleft = [xAxis, yAxis+blockheight];
        this.topright = [xAxis+blockwidth, yAxis + blockheight];
    }
}

// all of my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),

    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//draw the blocks
function addBlocks(){
    for(let x=0; x<blocks.length; x++){
        const block = document.createElement('div');
        block.classList.add("block");
        block.style.left = blocks[x].bottomleft[0] + "px";
        block.style.bottom = blocks[x].bottomleft[1] + "px";
        grid.appendChild(block);
    } 
}

addBlocks();

//add the user
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser()

//add the ball
const ball = document.createElement('div');
ball.classList.add("ball");
grid.appendChild(ball);
drawBall()

//move the user
function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if(userCurrPos[0]>0){
                userCurrPos[0]-=100;
                drawUser();
            }
            break;

        case 'ArrowRight':
            if(userCurrPos[0]<(boardwidth-blockwidth)){
                userCurrPos[0]+=100;
                drawUser();
            } 
            break; 
        default :
            alert('Only left and right arrow keys can be used!')
            break;
    
    }
}

document.addEventListener('keydown',moveUser);

//draw the user
function drawUser(){
    user.style.left = userCurrPos[0]+"px";
    user.style.bottom = userCurrPos[1]+"px";

}

//draw the ball
function drawBall(){
    ball.style.left = ballCurrPos[0]+"px";
    ball.style.bottom = ballCurrPos[1]+"px";
}

function moveBall(){
    ballCurrPos[0] += xDirection;
    ballCurrPos[1] += yDirection;
    collisiondetection();
    drawBall();
}

timerId = setInterval(moveBall,1);


function collisiondetection(){
    //block collisions
    for(let i =0; i<blocks.length; i++){
        if(
            (ballCurrPos[0] > blocks[i].bottomleft[0] && ballCurrPos[0] < blocks[i].bottomright[0]) &&
            ((ballCurrPos[1] + ballDiameter) > blocks[i].bottomleft[1] && ballCurrPos[1] < blocks[i].topleft[1])
        )
        {
            const allblocks = Array.from(document.querySelectorAll(".block"));
            allblocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection()
            score ++;
            scoredisplay.innerHTML = score;

            //win condition
                if(blocks.length === 0){
                    scoredisplay.innerHTML = "You Win!"
                    clearInterval(timerId);
                    document.removeEventListener('keydown',moveUser)
                }
        
        }
    }

    //wall collisions
    if(ballCurrPos[0] >= (boardwidth-ballDiameter) || ballCurrPos[0]<=0 || ballCurrPos[1]>= (boardheight-ballDiameter)){
        changeDirection();
    }

    //gameover
    if(ballCurrPos[1]<=0){
        scoredisplay.innerHTML = "You Lost!";
        clearInterval(timerId);
        document.removeEventListener('keydown',moveUser);
    }

    //check for paddle
    if(ballCurrPos[0]> userCurrPos[0] && ballCurrPos[0]<(userCurrPos[0]+blockwidth) && ballCurrPos[1]>userCurrPos[1] && ballCurrPos[1]<(userCurrPos[1]+blockheight)){
        changeDirection()
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
       yDirection = -2;
       return;
    }

    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return;
    }

    if(xDirection ===2 && yDirection === -2){
        xDirection =-2;
        return;

    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2; 
        return;
    }

}