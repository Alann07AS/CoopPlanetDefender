import { GO } from "./gameobject.js";

export class GameEngine {
    constructor (canvas, layerNb) {
        /**@type {HTMLCanvasElement} */
        this.canvas = canvas
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');

        this.canvas.width = this.setings.resolution.width;
        this.canvas.height = this.setings.resolution.height;

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

    setings = { // Do not Change here use GameEngine.ChangeSeting
        fps: 60,
        volume: {
            main: 1,
            music: 1,
            effect: 1,
            voice: 1,
        },
        resolution: {
            width: 1280,
            height: 720, 
            widthRef: 1280,
            heightRef: 720, // 720p default
            ratio: 16/9,
            scale: 1,
            keepScale: true,
        }
    }

    get ChangeSeting() {
        return {
            fps: v=> this.setings.fps = v,
            volume: {
                main: v=> this.setings.volume.main = v,
                music: v=> this.setings.volume.music = v,
                effect: v=> this.setings.volume.effect = v,
                voice: v=> this.setings.volume.voice = v,
            },
            resolution: {
                width: v=> {
                    this.setings.resolution.width =
                    this.canvas.width = v;
                    this.setings.resolution.ratio = this.setings.resolution.width/this.setings.resolution.height;
                },
                height: v=> {
                    const reso = this.setings.resolution
                    if (reso.keepScale) {
                        reso.scale = v/reso.heightRef
                    }
                    reso.height =
                    this.canvas.height = v;
                    reso.ratio = reso.width/reso.height;
                },
            }
            
        }
    }

    /**@type {Array<Array<GO>>} */
    GO_Layer = new Array()

    /**
     * 
     * @param {GO} go 
     * @param {number} layerNb 
     */
    AddGameObject(go, layerNb = this.GO_Layer.length) {
        go.ge = this
        this.GO_Layer[layerNb-1].push(go);
    }

    start () {
        this.gameloop(0)
    }

}