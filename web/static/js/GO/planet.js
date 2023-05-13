import { EnnemysPool } from "../game.js";
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"
import { CanonGO } from "./canon.js";
import { lifebarGO } from "./lifebar.js";



const PlanetGameObjectInfo = new GOinfo

PlanetGameObjectInfo.height = 200;
PlanetGameObjectInfo.width = 200;

PlanetGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("planet", "./static/assets/lavaplanetanim.png", 288, 288, 6, 1))

PlanetGameObjectInfo.localRotatePoint.x = PlanetGameObjectInfo.localRotatePoint.y = PlanetGameObjectInfo.height/2

PlanetGameObjectInfo.colision.circle.radius = 
PlanetGameObjectInfo.colision.circle.localX = 
PlanetGameObjectInfo.colision.circle.localY = PlanetGameObjectInfo.height/2;

const hitSoundBuffer = []
const bufLen = 5
for (let i=0;i<bufLen;i++) {hitSoundBuffer.push([new Audio("./static/sounds/sounds_hit.mp3"), false])}
hitSoundBuffer.forEach((s, i)=>{
    s[0].volume = 0.5
    s[0].addEventListener('pause', ()=>{; s[1] = false})    
})

PlanetGameObjectInfo.updateHandler = (/**@type {GO}*/go) => {
    PlanetGO.position.y = (PlanetGO.ge.setings.resolution.heightRef /2) - (PlanetGO.GOi.height/2)
    PlanetGO.position.x = (PlanetGO.ge.setings.resolution.widthRef /2) - (PlanetGO.GOi.width/2)
    
    CanonGO.position.y = go.ge.setings.resolution.heightRef/2 - PlanetGO.GOi.height + 8
    CanonGO.position.x = go.ge.setings.resolution.widthRef/2 - CanonGO.GOi.width/2
    go.changeAngle(go.angleDeg+0.03)    
    EnnemysPool.forEach(/**@param {GO} ene */(ene, index) => {
        if (go.colision.CheckCircle(ene)) {
            EnnemysPool.splice(index, 1);
            lifebarGO.lifeValue -= ene.Domage;
            for (let i =0;i<bufLen;i++) {if (!hitSoundBuffer[i][1]) {hitSoundBuffer[i][0].play(); hitSoundBuffer[i][1] = true;break}}
            setTimeout(()=>ene.destroy(), 500)
        }
    });
}

PlanetGameObjectInfo.renderHandlerAfter = (/**@type {GO}*/go, ctx) => {
    // go.colision.Draw.circle(ctx)
}

export const PlanetGO = new GO(PlanetGameObjectInfo)

