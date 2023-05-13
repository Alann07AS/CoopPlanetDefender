import { GO } from "./gameobject.js";
import { PlanetGO } from "./GO/planet.js";
import { CanonGO } from "./GO/canon.js";
import { BG_GO } from "./GO/bg.js";
import { CreateRandomEnnemy } from "./GO/ennemys.js";
import { GameEngine } from "./gameengine.js";
import { KeyManager } from "./keymanager.js";
import { lifebarGO } from "./GO/lifebar.js";

export const GE = new GameEngine(document.getElementById("screen"), 3)

let Ireso = 2
const resolutions = [
{w: 720, p: 480},
{w: 1280, p: 720},
{w: 1920, p: 1080},
{w: 3840, p: 2160},
{w: 7680, p: 4320},
]
const changeResolution = ()=> {
    if(typeof resolutions[Ireso] === 'undefined') return
    GE.ChangeSeting.resolution.width(resolutions[Ireso].w)
    GE.ChangeSeting.resolution.height(resolutions[Ireso].p)
    console.log(`Nouvelle resolution (${resolutions[Ireso].p}p), index (${Ireso}), scale(${GE.setings.resolution.scale})`);
};
changeResolution()


export const EnnemysPool = []
export function GameTest() {
    
    BG_GO.GOi.height = GE.setings.resolution.heightRef  
    BG_GO.GOi.width =  GE.setings.resolution.widthRef

    GE.AddGameObject(BG_GO, 1)
    GE.AddGameObject(PlanetGO, 2)
    GE.AddGameObject(CanonGO, 2)
    GE.AddGameObject(lifebarGO, 3)
    

    CanonGO.GOi.localRotatePoint.y = (CanonGO.GOi.height - 4 + PlanetGO.GOi.height/2)

    GE.updateLoop = ()=>{
        for (;EnnemysPool.length < 5;) {
            const ennemy = CreateRandomEnnemy()
            EnnemysPool.push(ennemy)
            GE.AddGameObject(ennemy, 2)
        }
        KeyManager.onKeyDown("k", ()=>{Array(...EnnemysPool).forEach((e, index)=>{
            EnnemysPool.splice(index, 1);
            e.playAnimationOnce("death1")
            e.IsAlive = false;
        })})
        KeyManager.onKeyDown("p", ()=>{Ireso++; changeResolution()})
        KeyManager.onKeyDown("m", ()=>{Ireso--; changeResolution()})
    }
    GE.start()
}

