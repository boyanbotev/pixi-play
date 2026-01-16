import { Container, Sprite } from "pixi.js";
import { Assets } from "pixi.js";
import { Manager } from "../common/Manager";
import { config } from "../common/config";

export default class ScrollingBackground extends Container {
    private moveIncrement: number;
    constructor(){
        super();
        this.moveIncrement = config.bg.moveIncrement;
        this.setup();
    }

    public reset() {
        this.moveIncrement = config.bg.moveIncrement;
    }

    public update(deltaTime: number){
        const { bg: { repeatWidth, increaseAmount } } = config;
        this.x -= this.moveIncrement * deltaTime;
        this.moveIncrement += increaseAmount * deltaTime;
        if (this.x <= repeatWidth) this.x = 0;
    }

    private setup(){
        const bg = new Sprite(Assets.get("bg"));
        bg.height = Manager.Height;
        bg.width = Manager.Width * 2;
        this.addChild(bg);
    }
}