import { GO, GOinfo, SpriteAnimation } from "./gameobject.js";
import { KeyManager } from "./keymanager.js";
import { PlanetGO } from "./GO/planet.js";
import { CanonGO } from "./GO/canon.js";
import { BG_GO } from "./GO/bg.js";

export function GameTest() {
    

    GE.GOS.push(BG_GO)
    GE.GOS.push(PlanetGO)
    GE.GOS.push(CanonGO)
    
    CanonGO.position.x = GE.canvas.width/2 - CanonGO.GOi.width/2
    CanonGO.position.y = GE.canvas.height/2 - PlanetGO.GOi.height + 8
    CanonGO.localRotatePoint.x = CanonGO.GOi.width/2
    CanonGO.localRotatePoint.y = (CanonGO.GOi.height - 4 + PlanetGO.GOi.height/2)
    
    GE.start()
}

class GameEngine {
    constructor (canvas) {
        /**@type {HTMLCanvasElement} */
        this.canvas = canvas
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');
    }

    lastTime = 0
    gameloop = (timeStamp)=>{
        const deltaTime = timeStamp - this.lastTime // update deltatime
        this.lastTime = timeStamp // update last time
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width) //clear screen

        this.GOS.forEach(go => { // update and render game object
            go.update();
            go.render(this.ctx, deltaTime);
        })

        requestAnimationFrame(this.gameloop) // next frame
    }

    /**@type {Array<GO>} */
    GOS = []

    start () {
        this.gameloop(0)
    }

}

export const GE = new GameEngine(document.getElementById("screen"))
