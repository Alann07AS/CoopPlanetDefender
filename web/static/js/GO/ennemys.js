import { GE } from "../game.js";
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"

const EnnemyType = []

export const GreenEnnemyGameObjectInfo = new GOinfo()
    GreenEnnemyGameObjectInfo.name = "greenenemy";
    GreenEnnemyGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("defaultgreen", "./static/assets/greenenemyssheet.png", 37, 32, 6, 6));
    GreenEnnemyGameObjectInfo.spritesAnimation.set("death1", new SpriteAnimation("death1", "./static/assets/greenenemysdeath1.png", 35, 32, 6, 3, "./static/sounds/death1.mp3"));
    GreenEnnemyGameObjectInfo.height = 37;
    GreenEnnemyGameObjectInfo.width  = 32;
    GreenEnnemyGameObjectInfo.speed  = 0.65;

    GreenEnnemyGameObjectInfo.colision.circle.radius = 18;
    GreenEnnemyGameObjectInfo.colision.circle.localX = 
    GreenEnnemyGameObjectInfo.colision.circle.localY = GreenEnnemyGameObjectInfo.height/2;

    GreenEnnemyGameObjectInfo.localRotatePoint.x =
    GreenEnnemyGameObjectInfo.localRotatePoint.y = GreenEnnemyGameObjectInfo.height/2;

    GreenEnnemyGameObjectInfo.renderHandlerAfter = (go, ctx)=> {
        // go.colision.Draw.circle(ctx)
    }

    /** @param {GO} g*/
    GreenEnnemyGameObjectInfo.updateHandler = function (g) {
        enneyUpdateHandler(g)
    }

EnnemyType.push(GreenEnnemyGameObjectInfo)



export const YellowEnnemyGameObjectInfo = new GOinfo()
    YellowEnnemyGameObjectInfo.name = "yellow";
    YellowEnnemyGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("defaultyellow", "./static/assets/yelowenemyssheet.png", 35, 32, 6, 6));
    YellowEnnemyGameObjectInfo.spritesAnimation.set("death1", new SpriteAnimation("death1", "./static/assets/yelowenemysdeath1.png", 35, 32, 6, 3, "./static/sounds/crack3.mp3"));
    YellowEnnemyGameObjectInfo.height = 32;
    YellowEnnemyGameObjectInfo.width  = 35;
    YellowEnnemyGameObjectInfo.speed  = 0.65;

    YellowEnnemyGameObjectInfo.colision.circle.radius = 18;
    YellowEnnemyGameObjectInfo.colision.circle.localX = 16;
    YellowEnnemyGameObjectInfo.colision.circle.localY = 16;

    YellowEnnemyGameObjectInfo.localRotatePoint.x =
    YellowEnnemyGameObjectInfo.localRotatePoint.y = YellowEnnemyGameObjectInfo.height/2;

    YellowEnnemyGameObjectInfo.renderHandlerAfter = (go, ctx)=> {
        // go.colision.Draw.circle(ctx)
    }

    /** @param {GO} g*/
    YellowEnnemyGameObjectInfo.updateHandler = function (g) {
        enneyUpdateHandler(g)
    }


EnnemyType.push(YellowEnnemyGameObjectInfo)

const enneyUpdateHandler = (g)=> {
    if (g.IsAlive) {
        g.move.direction();
    } else {
        if (g.curentAnim == "default") {
            g.destroy()
            g.render = ()=>null
        }
    }   
}

const screen = document.getElementById("screen");
const rayonSpawn = Math.hypot(screen.height, screen.width)/2;

export function CreateRandomEnnemy() {
    const ennemy = new GO(EnnemyType[Math.trunc(Math.random()*EnnemyType.length)])
    const randomAngle = Math.random() * Math.PI*2;
    ennemy.angleRad = randomAngle + Math.PI
    ennemy.position.x = Math.cos(randomAngle) * rayonSpawn + screen.width /2;
    ennemy.position.y = Math.sin(randomAngle) * rayonSpawn + screen.height /2;
    ennemy.IsAlive = true;
    ennemy.Domage = 4/100;
    return ennemy;
} 