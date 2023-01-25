import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";


export default class EnemyController{
    enemyMap=[
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [2,2,2,3,3,3,3,2,2,2],
        [2,2,2,3,3,3,3,2,2,2],
        [1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,2,2,2,2]
    ]
    enemyRows=[];

    currentDirection = MovingDirection.right;
    xVelocity =0;
    yVelocity= 0;
    defaultXvelocity = 1;
    defaultYvelocity = 1;
    movedowntimerDefault = 30;
    movedowntimer = this.movedowntimerDefault;
    fireBulletTimerDefault =100;
    fireBulletTimer = this.fireBulletTimerDefault

    constructor(canvas,enemyBulletContoller,playerBulletController){
        this.canvas = canvas;
        this.enemyBulletContoller=enemyBulletContoller;
        this.playerBulletController = playerBulletController;

        //play song when enemy dies
        this.createEnemies();

        this.EnemyDeathSound = new Audio('sounds/enemy-death.wav')
        this.EnemyDeathSound.volume=0.1

    }

    resetMoveDowntimer(){
        if(this.movedowntimer <= 0){
            this.movedowntimer = this.movedowntimerDefault;  
        }
    }

    decrementMoveDowntimer(){
        if(this.currentDirection === MovingDirection.downleft || this.currentDirection === MovingDirection.downright ){
            this.movedowntimer--;
        }
    }
    
    draw(ctx){
        this.decrementMoveDowntimer();
        this.updateVelocityAndDirection();
        this.collisiondetection();
        this.drawEnemies(ctx);
        this.resetMoveDowntimer();
        this.fireBullet();
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer<=0){
            this.fireBulletTimer=this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length)
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletContoller.shoot(enemy.x + enemy.width/2,enemy.y,-3,)
        }
    }

    collisiondetection(){
        this.enemyRows.forEach((enemyRow)=>{
            enemyRow.forEach((enemy,enemyIndex) =>{
                if(this.playerBulletController.collideWith(enemy)){
                    enemyRow.splice(enemyIndex,1)
                    this.EnemyDeathSound.currentTime=0;
                    this.EnemyDeathSound.play()
                }
            });
        });

        this.enemyRows = this.enemyRows.filter((enemyRow)=>enemyRow.length>0)
    }

    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXvelocity;
                this.yVelocity=0;
                const rightmostenemy = enemyRow[enemyRow.length - 1];
                if(rightmostenemy.x + rightmostenemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downleft;
                    break;
                }
            }

            else if(this.currentDirection === MovingDirection.downleft){
                this.moveDown(MovingDirection.left)
                break;
            }

            else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXvelocity;
                this.yVelocity = 0;
                const leftmostenemy = enemyRow[0];
                if(leftmostenemy.x <= 0){
                    this.currentDirection = MovingDirection.downright;
                    break;
                } 
            }

            if(this.currentDirection == MovingDirection.downright){
                this.moveDown(MovingDirection.right)
                break;
               
            }
        }

    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity,this.yVelocity)
            enemy.draw(ctx);
        })
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYvelocity;
        if (this.movedowntimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    createEnemies(){
        this.enemyMap.forEach((row,rowIndex)=>{
            this.enemyRows[rowIndex] = []
            row.forEach((enemyNumber,enemyIndex)=>{
                if(enemyNumber>0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex*50,rowIndex*35,enemyNumber))
                }
            })
        })
    }

    collideWith(sprite){
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite))
    }



}