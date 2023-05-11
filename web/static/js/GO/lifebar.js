
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"



const lifebarGameObjectInfo = new GOinfo()

lifebarGameObjectInfo.height = 100;
lifebarGameObjectInfo.width = 100;

lifebarGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("planet", "./static/assets/lavaplanetlifebar.png", 288, 288, 1, 0))

const position = {x: 50, y: 50}

const center = lifebarGameObjectInfo.height/2 + position.x

const rgb = {
    r: 207,
    g: 106,
    b: 12
}

/**
 * @param {GO} go 
 * @param {CanvasRenderingContext2D} ctx 
 */
lifebarGameObjectInfo.renderHandlerBefore = (go, ctx)=>{
    ctx.beginPath()
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    ctx.arc(center, center, lifebarGameObjectInfo.height/2-5, 0, Math.PI*2)
    ctx.fill()
}

export const lifebarGO = new GO(lifebarGameObjectInfo)

lifebarGO.lifeValue = 1;

lifebarGO.position = position;