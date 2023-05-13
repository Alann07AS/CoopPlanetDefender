
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


lifebarGameObjectInfo.updateHandler = (g)=> {
    if (g.lifeValue != g.lastLifeValue) {
        g.lastLifeValue = g.lifeValue
        const mult = 1 - g.lifeValue
        g.rgb.r = rgb.r + (255 - rgb.r) * mult
        g.rgb.g = rgb.g + (255 - rgb.g) * mult
        g.rgb.b = rgb.b + (255 - rgb.b) * mult
    }
}

/**
 * @param {GO} go 
 * @param {CanvasRenderingContext2D} ctx 
 */
lifebarGameObjectInfo.renderHandlerBefore = (go, ctx)=>{
    ctx.beginPath()
    ctx.fillStyle = `rgb(${go.rgb.r}, ${go.rgb.g}, ${go.rgb.b})`
    ctx.arc(center, center, lifebarGameObjectInfo.height/2-5, 0, Math.PI*2)
    ctx.fill()
    ctx.font = "30px StoneFont";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black"
    ctx.fillText(Math.trunc(go.lifeValue*100), center, center);
}

export const lifebarGO = new GO(lifebarGameObjectInfo)

lifebarGO.lifeValue =
lifebarGO.lastLifeValue = 1;

lifebarGO.rgb = structuredClone(rgb) 

lifebarGO.position = position;