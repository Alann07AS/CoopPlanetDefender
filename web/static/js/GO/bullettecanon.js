import { GE } from "../game.js";
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"
import { KeyManager } from "../keymanager.js";


const BulletCanonGameObjectInfo = new GOinfo()
    BulletCanonGameObjectInfo.name = "bulettecanon";
    BulletCanonGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("canonhandle", "./static/assets/cannonbullet.png", 32, 32, 2, 12 ));
    BulletCanonGameObjectInfo.height = 32;
    BulletCanonGameObjectInfo.width = 32;
    BulletCanonGameObjectInfo.speed = 4;

    /** @param {GO} g*/


// export const BulletCanonGO = new GO(BulletCanonGameObjectInfo)

/**
 * @param {GO} player
 */
export function CreateBulletCannonFromPlayer(player) {
    const newBulletGO = new GO(BulletCanonGameObjectInfo)
    // A FAIRE
    newBulletGO.position.x = player.position.x + -(player.localRotatePoint.y) * Math.cos(player.angleRad)
    newBulletGO.position.y = player.position.y + (player.localRotatePoint.y) * Math.sin(player.angleRad)
    console.log(newBulletGO.position.x, newBulletGO.position.y);
    newBulletGO.localRotatePoint.x = newBulletGO.localRotatePoint.y = newBulletGO.GOi.height/2 
    GE.GOS.push(newBulletGO)
}
