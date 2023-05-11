export class GameEngine {
    constructor (canvas, layerNb) {
        /**@type {HTMLCanvasElement} */
        this.canvas = canvas
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');

        for (;layerNb > 0;layerNb--) {
            this.GO_Layer.push([])
        }
    }

    updateLoop = ()=>{
        //your game code
    }

    lastTime = 0
    destroyload = []
    gameloop = (timeStamp)=>{
        const deltaTime = timeStamp - this.lastTime // update deltatime
        this.lastTime = timeStamp // update last time
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width) //clear screen
        
        this.updateLoop() //main update game

        this.GO_Layer.forEach((layer, layerNb) => {
            layer.forEach((go, index) => { // update and render game object
                if (go._destroy) {
                    this.destroyload.push([index, layerNb])
                    return
                }
                go.update();
                go.render(this.ctx, deltaTime);
            })
        })
        this.destroyload.forEach((v)=>this.GO_Layer[v[1]].splice(v[0], 1))
        this.destroyload = []

        requestAnimationFrame(this.gameloop) // next frame
    }

    /**@type {Array<Array<GO>>} */
    GO_Layer = new Array()

    AddGameObject(go, layerNb = this.GO_Layer.length) {
        this.GO_Layer[layerNb-1].push(go)
    }

    start () {
        this.gameloop(0)
    }

}