import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"
import { KeyManager } from "../keymanager.js";
import { CreateBulletCannonFromPlayer } from "./bullettecanon.js";


const CanonGameObjectInfo = new GOinfo()
    CanonGameObjectInfo.name = "canon";
    CanonGameObjectInfo.spritesAnimation.set("shoot", new SpriteAnimation("canonshoot", "./static/assets/canonshoot.png", 95, 126.75, 12, 18));
    CanonGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("canonhandle", "./static/assets/canondefault.png", 95, 126.75, 1, 0));
    CanonGameObjectInfo.height = 95;
    CanonGameObjectInfo.width  = 126.75;
    CanonGameObjectInfo.speed  = 4;

    /** @param {GO} g*/
    CanonGameObjectInfo.updateHandler = function (g) {
        KeyManager.whileKeyDown(KeyManager.UpArrow, ()=>{
            g.changeAngle(g.angleDeg+1)
        })
        KeyManager.whileKeyDown(KeyManager.DownArrow, ()=>{
            g.changeAngle(g.angleDeg-1)
        })
        KeyManager.onKeyDown(KeyManager.Space, ()=>{
            g.playAnimationOnce("shoot")
            CreateBulletCannonFromPlayer(g)
        })
    }


    export const CanonGO = new GO(CanonGameObjectInfo)
