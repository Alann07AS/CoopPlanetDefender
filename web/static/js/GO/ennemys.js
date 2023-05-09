import { GE } from "../game.js";
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"

const EnnemyType = []

export const GreenEnnemyGameObjectInfo = new GOinfo()
    GreenEnnemyGameObjectInfo.name = "greenenemy";
    GreenEnnemyGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("defaultgreen", "./static/assets/greenenemyssheet.png", 37, 32, 6, 6));
    GreenEnnemyGameObjectInfo.height = 32;
    GreenEnnemyGameObjectInfo.width  = 32;
    GreenEnnemyGameObjectInfo.speed  = 1.5;

    /** @param {GO} g*/
    GreenEnnemyGameObjectInfo.updateHandler = function (g) {
        g.move.direction();
    }

EnnemyType.push(GreenEnnemyGameObjectInfo)



export const YellowEnnemyGameObjectInfo = new GOinfo()
    YellowEnnemyGameObjectInfo.name = "yellow";
    YellowEnnemyGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("defaultyellow", "./static/assets/yelowenemyssheet.png", 35, 32, 6, 6));
    YellowEnnemyGameObjectInfo.height = 32;
    YellowEnnemyGameObjectInfo.width  = 35;
    YellowEnnemyGameObjectInfo.speed  = 1.5;

    /** @param {GO} g*/
    YellowEnnemyGameObjectInfo.updateHandler = function (g) {
        g.move.direction();
    }

EnnemyType.push(YellowEnnemyGameObjectInfo)

const screen = document.getElementById("screen");
const rayonSpawn = Math.sqrt(Math.pow(screen.height, 2) + Math.pow(screen.width, 2))/2;

export function CreateRandomEnnemy() {
    const ennemy = new GO(EnnemyType[Math.trunc(Math.random()*EnnemyType.length)])
    const randomAngle = Math.random() * Math.PI*2;
    ennemy.angleRad = randomAngle + Math.PI
    ennemy.position.x = Math.cos(randomAngle) * rayonSpawn + screen.width /2;
    ennemy.position.y = Math.sin(randomAngle) * rayonSpawn + screen.height /2;
    return ennemy;
} 