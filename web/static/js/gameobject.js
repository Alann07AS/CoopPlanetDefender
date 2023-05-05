
export class GO {
    /**
     * 
     * @param {GOinfo} GOi 
     */
    constructor (GOi) {
        this.GOi = GOi;
    }
    position = {x:0, y:0}
    speed = 1
    curentAnim = "default"
    isPlayAnimOnce = false
    frameCount = 0
    animTimerCount = 0
    
    
    angleRad = 0
    angleDeg = 0
    localRotatePoint = {x: 0, y: 0}

    changeAngle(angleDegres) {
        this.angleDeg = angleDegres
        this.angleRad = angleDegres * (Math.PI/180)
    }

    /** @param {CanvasRenderingContext2D} ctx */
    render = (ctx, deltaTime)=>{  //render images sprites of specific anim
        //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
        const anim = this.GOi.spritesAnimation.get(this.curentAnim)
        
        if (this.angleRad !== 0) {
            ctx.save()
            const cahceX = this.position.x + this.localRotatePoint.x, cacheY = this.position.y + this.localRotatePoint.y
            ctx.translate(cahceX, cacheY);
            
            ctx.rotate(this.angleRad)
            ctx.drawImage(anim.spritesImage, this.frameCount*anim.width, 0, anim.width, anim.height, -this.localRotatePoint.x, -this.localRotatePoint.y, this.GOi.width, this.GOi.height)

            // ctx.beginPath();ctx.fillStyle = "green";ctx.arc(0, 0, 5, 0, 2*Math.PI);ctx.fill(); //draw rotation point
            ctx.restore()
        } else {
            ctx.drawImage(anim.spritesImage, this.frameCount*anim.width, 0, anim.width, anim.height, this.position.x, this.position.y, this.GOi.width, this.GOi.height)
        }
        
        if (this.animTimerCount > (1000/anim.speedFrame)) {
            this.frameCount++;
            this.animTimerCount = 0;
        } else {
            this.animTimerCount += deltaTime;
        }
        if (this.frameCount >= anim.frameNb) {
            this.frameCount = 0;
            if (this.isPlayAnimOnce) {
                this.curentAnim = "default";
                this.isPlayAnimOnce = false;
            }
            
        }
    }

    update = ()=>{
        this.GOi.updateHandler(this)
    }

    playAnimationOnce (animationName) {
        this.curentAnim = animationName;
        this.isPlayAnimOnce = true;
    }

    get move() {
        console.log(this.position);
        return {
            left:  (specifiqueSpeed)=> {
                this.position.x -= (specifiqueSpeed||this.GOi.speed)
            },
            right:  (specifiqueSpeed)=> {
                this.position.x += (specifiqueSpeed||this.GOi.speed)
            },
            up:  (specifiqueSpeed)=> {
                this.position.y -= (specifiqueSpeed||this.GOi.speed)
            },
            down:  (specifiqueSpeed)=> {
                this.position.y += (specifiqueSpeed||this.GOi.speed)
            },
            direction:  (angleRadian, specifiqueSpeed)=> {
                this.position.x += (( specifiqueSpeed || this.GOi.speed ) * Math.cos(( angleRadian || this.angleRad )))
                this.position.y += (( specifiqueSpeed || this.GOi.speed ) * Math.sin(( angleRadian || this.angleRad )))
            },
        }
    }
    
    /** @param {Function} updateHandler */
    setLocalUpdate(updateHandler) {
        this.local_update = updateHandler
    }

    /** @param {Function} updateHandler */
    setLocalRender(renderHandler) {
        this.local_render = renderHandler
    }
}


export class GOinfo {
    /**@type {string} */
    name = ""
    /**@type {number} */
    height = 0
    /**@type {number} */
    width = 0
    /**@type {number} */
    speed = 1
    // /**@type {SpriteAnimation} */
    // handle_sprites
    /**@type {Map<string, SpriteAnimation>} */
    spritesAnimation = new Map()
    /**@type {Function} */
    renderHandler = ()=>{}
     /**
    * @type {function(GO): void}
    */
    updateHandler = (go)=>{}

}

export class SpriteAnimation {
    constructor (name, spritesImage, height, width, frameNb, speedFrame, sound) {
        this.name = name
        this.height = height
        this.width = width
        this.spritesImage = new Image(width, height)
        this.spritesImage.src = spritesImage
        const th = this;
        this.spritesImage.onerror = (ev)=>{
            console.error(`Bad src Image ("${th.name}") Src("${th.spritesImage.src}")`);
        }
        this.frameNb = frameNb;
        this.speedFrame = speedFrame;
        this.sound = new Audio(sound) // a voir plus tard    
    }
}
