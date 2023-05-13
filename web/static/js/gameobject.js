import { GameEngine } from "./gameengine.js";

export class GO {
    /**
     * 
     * @param {GOinfo} GOi 
     */
    constructor (GOi) {
        this.GOi = GOi;
    }

    /**@type {GameEngine} */
    ge = null
    
    destroy() {this._destroy = true}
    position = {x:0, y:0}
    get colision () {
        return {
            CheckBox: (/**@type {GO}*/otherGameOB) => {
            
            },
            CheckCircle: (/**@type {GO}*/otherGameOB) => {
                const xy = this.localToGlobal(this.GOi.colision.circle.localX, this.GOi.colision.circle.localY)
                const xyother = otherGameOB.localToGlobal(otherGameOB.GOi.colision.circle.localX, otherGameOB.GOi.colision.circle.localY)
                return Math.hypot(xy[0] - xyother[0], xy[1] - xyother[1]) < this.GOi.colision.circle.radius + otherGameOB.GOi.colision.circle.radius;
            },
            Draw: {
                circle: (/**@type {CanvasRenderingContext2D}*/ctx)=>{
                    ctx.fillStyle = `rgba(0, 255, 0, 0.2)`
                    ctx.beginPath()
                    ctx.arc(...this.localToGlobal(this.GOi.colision.circle.localX, this.GOi.colision.circle.localY), this.GOi.colision.circle.radius, 0, Math.PI*2)
                    ctx.fill()
                },
                box: (/**@type {CanvasRenderingContext2D}*/ctx)=>{}
            }
        }
    }
    speed = 1
    curentAnim = "default"
    isPlayAnimOnce = false
    frameCount = 0
    animTimerCount = 0
    
    
    angleRad = 0
    angleDeg = 0

    changeAngle(angleDegres) {
        this.angleDeg = angleDegres
        this.angleRad = angleDegres * (Math.PI/180)

    }

    /** @param {CanvasRenderingContext2D} ctx */
    render = (ctx, deltaTime)=>{  //render images sprites of specific anim
        ctx.save()
        ctx.scale(this.ge.setings.resolution.scale, this.ge.setings.resolution.scale)
        this.GOi.renderHandlerBefore(this, ctx)
        ctx.restore()
        //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
        const anim = this.GOi.spritesAnimation.get(this.curentAnim)
        if (this.frameCount == 0 && anim.soundBuffer[0][0].src && !this.animLoopStart) {for(let i=0;i<3;i++) {
            if (!anim.soundBuffer[i][1]){
                this.animLoopStart = true;
                anim.soundBuffer[i][0].play();
                anim.soundBuffer[i][1]=true; break;
            }
        }}
        ctx.save()
        // console.log(this.ge.setings.resolution.scale);
        ctx.scale(this.ge.setings.resolution.scale, this.ge.setings.resolution.scale)
        if (this.angleRad !== 0) {
            // const cahceX = this.position.x + this.GOi.localRotatePoint.x, cacheY = this.position.y + this.GOi.localRotatePoint.y
            // const xyl = this.localToGlobal(this.GOi.localRotatePoint.x, this.GOi.localRotatePoint.y)
            ctx.translate(this.position.x + this.GOi.localRotatePoint.x, this.position.y + this.GOi.localRotatePoint.y)//...xyl);
            
            ctx.rotate(this.angleRad)
            ctx.drawImage(anim.spritesImage, this.frameCount*anim.width, 0, anim.width, anim.height, -this.GOi.localRotatePoint.x, -this.GOi.localRotatePoint.y, this.GOi.width , this.GOi.height) //-this.GOi.localRotatePoint.x, -this.GOi.localRotatePoint.y

            // ctx.beginPath();ctx.fillStyle = "blue";ctx.arc(0, 0, 5, 0, 2*Math.PI);ctx.fill(); //draw rotation point
            
        } else {
            ctx.drawImage(anim.spritesImage, this.frameCount*anim.width, 0, anim.width, anim.height, this.position.x, this.position.y, this.GOi.width, this.GOi.height)
        }
        ctx.restore()
        if (this.animTimerCount > (1000/anim.speedFrame)) {
            this.frameCount++;
            this.animTimerCount = 0;
            this.animLoopStart = false;
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
        ctx.save()
        ctx.scale(this.ge.setings.resolution.scale, this.ge.setings.resolution.scale)
        this.GOi.renderHandlerAfter(this, ctx)
        ctx.restore()
    }

    update = ()=>{
        this.GOi.updateHandler(this)
    }

    playAnimationOnce (animationName) {
        if (this.isPlayAnimOnce) return
        this.animTimerCount =
        this.frameCount = 0;
        this.curentAnim = animationName;
        this.isPlayAnimOnce = true;
    }

    get move() {
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

    localToGlobal(lx, ly) {
        lx -= this.GOi.localRotatePoint.x
        ly -= this.GOi.localRotatePoint.y
        return [
            (this.position.x + this.GOi.localRotatePoint.x) + lx * Math.cos(-this.angleRad) + ly * Math.sin(-this.angleRad),
            (this.position.y + this.GOi.localRotatePoint.y) + -lx * Math.sin(-this.angleRad) + ly * Math.cos(-this.angleRad),
        ]
    }
    
    /** @param {Function} updateHandler */
    setLocalUpdate(updateHandler) {
        this.local_update = updateHandler
    }

    /** @param {Function} updateHandler */
    setLocalRender(renderHandlerAfter) {
        this.local_render = renderHandlerAfter
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
    renderHandlerAfter = (go, ctx)=>{}
    /**@type {Function} */
    renderHandlerBefore = (go, ctx)=>{}
    /**
    * @type {function(GO): void}
    */
    updateHandler = (go)=>{}

    localRotatePoint = {x: 0, y: 0}

    colision = {
        box: {height: this.height, width: this.width, localX:0, localY: 0},
        circle: {radius: this.width/2, localX:-this.width/2, localY: this.height/2},
    }
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
        this.soundBuffer = [[new Audio(sound), false], [new Audio(sound), false], [new Audio(sound), false]]; // Créez un nouvel objet Audio
        this.soundBuffer.forEach((s, i)=>{
            s[0].addEventListener('play', ()=>{; s[1] = true})
            s[0].addEventListener('pause', ()=>{; s[1] = false})    
        })
    }
}
