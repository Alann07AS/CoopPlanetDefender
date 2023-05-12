import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"
import { KeyManager } from "../keymanager.js";
import { CreateBulletCannonFromPlayer } from "./bullettecanon.js";


const CanonGameObjectInfo = new GOinfo()
    CanonGameObjectInfo.name = "canon";
    CanonGameObjectInfo.spritesAnimation.set("shoot", new SpriteAnimation("canonshoot", "./static/assets/canonshoot.png", 95, 126.75, 12, 24, "./static/sounds/canon.mp3"));
    CanonGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("canonhandle", "./static/assets/canondefault.png", 95, 126.75, 1, 0));
    CanonGameObjectInfo.height = 95;
    CanonGameObjectInfo.width  = 126.75;
    CanonGameObjectInfo.speed  = 4;
    CanonGameObjectInfo.localRotatePoint.x = CanonGameObjectInfo.width/2

    const CanonMove = new Audio("./static/sounds/engLoop.mp3")
    CanonMove.loop = true;
    CanonMove.volume = 0.3

    
    /** @param {GO} g*/
    CanonGameObjectInfo.updateHandler = function (g) {
        KeyManager.whileKeyDown(KeyManager.UpArrow, ()=>{
            CanonMove.play();
            g.changeAngle(g.angleDeg+1)
        })
        KeyManager.whileKeyDown(KeyManager.DownArrow, ()=>{
            CanonMove.play();
            g.changeAngle(g.angleDeg-1)
        })
        KeyManager.onKeyUp(KeyManager.UpArrow, ()=>{
            CanonMove.pause();
            g.changeAngle(g.angleDeg+1)
        })
        KeyManager.onKeyUp(KeyManager.DownArrow, ()=>{
            CanonMove.pause();
            g.changeAngle(g.angleDeg-1)
        })
        KeyManager.whileKeyDown(KeyManager.Space, ()=>{
            if (g.isReload && !g.isPlayAnimOnce) {
                g.playAnimationOnce("shoot")
                CreateBulletCannonFromPlayer(g)
                g.isReload = false
                setTimeout(()=>g.isReload=true, 600)
            }
        })
    }


    export const CanonGO = new GO(CanonGameObjectInfo)

    CanonGO.isReload = true