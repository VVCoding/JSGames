import Bullet from "./Bullet.js"

export default class BulletController{
    bullets = [];
    timebetweenbullets =0;

    constructor(canvas,maxBullets,bulletColor,soundenabled){
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;
        this.soundenabled = soundenabled;

        this.shootsound = new Audio("sounds/shoot.wav");
        this.shootsound.volume = 0.1
    }

    draw(ctx){
        this.bullets = this.bullets.filter((bullet)=>bullet.y+bullet.width>0 && bullet.y<=this.canvas.height)

        //console.log("bullet")
        this.bullets.forEach((bullet) =>bullet.draw(ctx));
        
        if(this.timebetweenbullets>0){
            this.timebetweenbullets--;
        }
    }

    collideWith(sprite){
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet)=>
            bullet.collideWith(sprite)
        )
        
        if(bulletThatHitSpriteIndex>=0){
            this.bullets.splice(bulletThatHitSpriteIndex,1)
            return true
        }
        else{
            return false
        }
    }

    shoot(x,y,velocity,timebetweenbullets=0){
        if(this.timebetweenbullets <= 0 && this.bullets.length<this.maxBullets){
            const bullet = new Bullet(this.canvas,x,y,velocity,this.bulletColor)
            this.bullets.push(bullet);
            if(this.soundenabled){
                this.shootsound.currentTime = 0;
                this.shootsound.play();
            }
            this.timebetweenbullets = timebetweenbullets;
        }
    }
}