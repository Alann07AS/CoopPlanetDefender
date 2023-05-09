import { GO } from "./gameobject.js";
import { PlanetGO } from "./GO/planet.js";
import { CanonGO } from "./GO/canon.js";
import { BG_GO } from "./GO/bg.js";
import { CreateRandomEnnemy } from "./GO/ennemys.js";
import { GameEngine } from "./gameengine.js";

export const GE = new GameEngine(document.getElementById("screen"))

export function GameTest() {
    

    GE.GOS.push(BG_GO)
    GE.GOS.push(PlanetGO)
    GE.GOS.push(CanonGO)
    
    CanonGO.position.x = GE.canvas.width/2 - CanonGO.GOi.width/2
    CanonGO.position.y = GE.canvas.height/2 - PlanetGO.GOi.height + 8
    CanonGO.localRotatePoint.x = CanonGO.GOi.width/2
    CanonGO.localRotatePoint.y = (CanonGO.GOi.height - 4 + PlanetGO.GOi.height/2)

    const EnnemysPool = []

    GE.updateLoop = ()=>{
        for (;EnnemysPool.length < 5;) {
            const ennemy = CreateRandomEnnemy()
            EnnemysPool.push(ennemy)
            GE.GOS.push(ennemy)
        }
    }
    
    GE.start()
}

