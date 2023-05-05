
import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"



const BG_GameObjectInfo = new GOinfo

const infoScreen = document.getElementById("screen").getBoundingClientRect()
BG_GameObjectInfo.height = infoScreen.height;
BG_GameObjectInfo.width = infoScreen.width;

BG_GameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("planet", "./static/assets/bg.png", 360, 640, 1, 0))


export const BG_GO = new GO(BG_GameObjectInfo)

BG_GO.position.y = 0
BG_GO.position.x = 0