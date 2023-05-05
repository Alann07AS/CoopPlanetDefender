import { GO, GOinfo, SpriteAnimation } from "../gameobject.js"



const PlanetGameObjectInfo = new GOinfo

PlanetGameObjectInfo.height = 200;
PlanetGameObjectInfo.width = 200;

PlanetGameObjectInfo.spritesAnimation.set("default", new SpriteAnimation("planet", "./static/assets/lavaplanet.png", 288, 288, 1, 0))


export const PlanetGO = new GO(PlanetGameObjectInfo)

const infoScreen = document.getElementById("screen").getBoundingClientRect()
PlanetGO.position.y = (infoScreen.height/2)-(PlanetGO.GOi.height /2) 
PlanetGO.position.x = (infoScreen.width/2)-(PlanetGO.GOi.width /2)