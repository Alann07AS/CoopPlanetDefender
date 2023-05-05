
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
    frameCount = 0
    animTimerCount = 0
    
    /** @param {CanvasRenderingContext2D} ctx */
    render = (ctx, deltaTime)=>{  //render images sprites of specific anim
        //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
        const anim = this.GOi.spritesAnimation.get(this.curentAnim)
        ctx.drawImage(anim.spritesImage, this.frameCount*anim.width, 0, anim.width, anim.height, this.position.x, this.position.y, this.GOi.width, this.GOi.height)
        if (this.animTimerCount > (1000/anim.speedFrame)) {
            this.frameCount++;
            this.animTimerCount = 0;
        } else {
            this.animTimerCount += deltaTime;
        }
        if (this.frameCount >= anim.frameNb) this.frameCount = 0;
    }

    update = ()=>{
        this.GOi.updateHandler(this)
    }

    get move() {
        console.log(this.position);
        return {
            left:  ()=> {
                this.position.x -= this.GOi.speed
            },
            right:  ()=> {
                this.position.x += this.GOi.speed
            },
            up:  ()=> {
                this.position.y -= this.GOi.speed
            },
            down:  ()=> {
                this.position.y += this.GOi.speed
            }
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
    /**@type {function(GO: GO)} */
    updateHandler = ()=>{}
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
