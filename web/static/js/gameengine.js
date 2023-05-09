export class GameEngine {
    constructor (canvas) {
        /**@type {HTMLCanvasElement} */
        this.canvas = canvas
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');
    }

    updateLoop = ()=>{
        //your game code
    }

    lastTime = 0
    gameloop = (timeStamp)=>{
        const deltaTime = timeStamp - this.lastTime // update deltatime
        this.lastTime = timeStamp // update last time
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width) //clear screen
        
        this.updateLoop() //main update game

        this.GOS.forEach((go, index) => { // update and render game object
            if (go._destroy) {
                this.GOS.splice(index, 1)
                return
            }
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