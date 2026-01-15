import { Container, Sprite } from "pixi.js";
import { Assets } from "pixi.js";
import { Manager } from "../common/Manager";

export default class ScrollingBackground extends Container {
    constructor(){
        super();
        this.setup();
    }

    
    public update(){
        this.x -= 0.5;
        if (this.x <= -1500) this.x = 0;
    }

    private setup(){
        const bg = new Sprite(Assets.get("bg"));
        bg.height = Manager.Height;
        bg.width = Manager.Width * 2;
        this.addChild(bg);
    }
}