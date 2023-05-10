import { EnnemysPool, GE } from "../game.js";
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"
import { KeyManager } from "../keymanager.js";


const BulletCanonGameObjectInfo = new GOinfo()
    BulletCanonGameObjectInfo.name = "bulettecanon";
    BulletCanonGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("canonhandle", "./static/assets/cannonbullet.png", 32, 32, 2, 12 ));
    BulletCanonGameObjectInfo.height = 32;
    BulletCanonGameObjectInfo.width = 32;
    BulletCanonGameObjectInfo.speed = 2;
    BulletCanonGameObjectInfo.colision.circle.radius = 8;
    BulletCanonGameObjectInfo.colision.circle.localX = 16;
    BulletCanonGameObjectInfo.colision.circle.localY = 16;

    BulletCanonGameObjectInfo.localRotatePoint.x = BulletCanonGameObjectInfo.localRotatePoint.y = BulletCanonGameObjectInfo.height/2

    /**@param {GO} g */
    BulletCanonGameObjectInfo.updateHandler = (g) => {
        g.move.direction()
        EnnemysPool.forEach((ene, index) => {
            if (g.colision.CheckCircle(ene)) {
                ene.destroy();
                g.destroy();
                EnnemysPool.splice(index, 1);
            }
        });
    }

    BulletCanonGameObjectInfo.renderHandler = (go, ctx) => {
        // go.colision.Draw.circle(ctx)
    }

    /** @param {GO} g*/


// export const BulletCanonGO = new GO(BulletCanonGameObjectInfo)

/**
 * @param {GO} player
 */
export function CreateBulletCannonFromPlayer(player) {
    const newBulletGO = new GO(BulletCanonGameObjectInfo)
    
    newBulletGO.position.x = (player.position.x + player.GOi.localRotatePoint.x - 15) + (player.GOi.localRotatePoint.y - 24) * Math.cos(player.angleRad-Math.PI/2)
    newBulletGO.position.y = (player.position.y + player.GOi.localRotatePoint.y - 15) + (player.GOi.localRotatePoint.y - 24) * Math.sin(player.angleRad-Math.PI/2)
    newBulletGO.angleRad = player.angleRad-Math.PI/2
    GE.GOS.push(newBulletGO)
    setTimeout(()=>{newBulletGO.destroy()}, 4000)
}
