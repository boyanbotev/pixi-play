import { Container, Sprite } from "pixi.js";
import { Assets } from "pixi.js";
import { Manager } from "../common/Manager";
import { config } from "../common/config";

export default class ScrollingBackground extends Container {
    constructor(){
        super();
        this.setup();
    }

    public update(){
        const { bg: { repeatWidth, moveIncrement } } = config;
        this.x -= moveIncrement;
        if (this.x <= repeatWidth) this.x = 0;
    }

    private setup(){
        const bg = new Sprite(Assets.get("bg"));
        bg.height = Manager.Height;
        bg.width = Manager.Width * 2;
        this.addChild(bg);
    }
}