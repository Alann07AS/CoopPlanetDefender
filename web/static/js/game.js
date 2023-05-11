import { GO } from "./gameobject.js";
import { PlanetGO } from "./GO/planet.js";
import { CanonGO } from "./GO/canon.js";
import { BG_GO } from "./GO/bg.js";
import { CreateRandomEnnemy } from "./GO/ennemys.js";
import { GameEngine } from "./gameengine.js";
import { KeyManager } from "./keymanager.js";
import { lifebarGO } from "./GO/lifebar.js";

export const GE = new GameEngine(document.getElementById("screen"), 3)

export const EnnemysPool = []
export function GameTest() {
    

    GE.AddGameObject(BG_GO, 1)
    GE.AddGameObject(PlanetGO, 2)
    GE.AddGameObject(CanonGO, 2)
    GE.AddGameObject(lifebarGO, 3)
    
    CanonGO.position.x = GE.canvas.width/2 - CanonGO.GOi.width/2
    CanonGO.position.y = GE.canvas.height/2 - PlanetGO.GOi.height + 8

    CanonGO.GOi.localRotatePoint.y = (CanonGO.GOi.height - 4 + PlanetGO.GOi.height/2)

    GE.updateLoop = ()=>{
        for (;EnnemysPool.length < 5;) {
            const ennemy = CreateRandomEnnemy()
            EnnemysPool.push(ennemy)
            GE.AddGameObject(ennemy, 2)
        }
        // KeyManager.onKeyDown("p", ()=>{console.log(GE.GOS);})
    }
    console.log(GE.GO_Layer);
    GE.start()
}

