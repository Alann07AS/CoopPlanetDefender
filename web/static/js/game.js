import { GO, GOinfo, SpriteAnimation } from "./gameobject.js";
import { KeyManager } from "./keymanager.js";

export function GameTest() {
    const GOinfoTest = new GOinfo()
    GOinfoTest.name = "canon";
    GOinfoTest.spritesAnimation.set("default", new SpriteAnimation("planet", "./static/assets/hightpurple.png", 710, 800, 8, 8));
    GOinfoTest.height = 355;
    GOinfoTest.width = 400;
    GOinfoTest.speed = 4;
    // GOinfoTest.renderHandler
    GOinfoTest.updateHandler = (GO)=>{
        KeyManager.whileKeyDown(KeyManager.LeftArrow, ()=>{
            GO.move.left()
        })
        KeyManager.whileKeyDown(KeyManager.RightArrow, ()=>{
            GO.move.right()
        })
        KeyManager.whileKeyDown(KeyManager.UpArrow, ()=>{
            GO.move.up()
        })
        KeyManager.whileKeyDown(KeyManager.DownArrow, ()=>{
            GO.move.down()
        })
    }

    const GE = new GameEngine(document.getElementById("screen"))
    const GOtest = new GO(GOinfoTest)
    GE.GOS.push(GOtest)

    GE.start()
}

class GameEngine {
    constructor (canvas) {
        this.canvas = canvas
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');
    }

    lastTime = 0
    gameloop = (timeStamp)=>{
        const deltaTime = timeStamp - this.lastTime // update deltatime
        this.lastTime = timeStamp // update last time
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width) //clear screen

        this.GOS.forEach(go => { // update and render game object
            go.update();
            go.render(this.ctx, deltaTime);
        })

        requestAnimationFrame(this.gameloop) // next frame
    }

    /**@type {Array<GO>} */
    GOS = []

    start () {
        this.gameloop(0)
    }


}