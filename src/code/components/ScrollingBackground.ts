import { Container, Sprite } from "pixi.js";
import { Assets } from "pixi.js";
import { Manager } from "../common/Manager";
import { config } from "../common/config";

export default class ScrollingBackground extends Container {
    private moveIncrement: number;
    constructor(){
        super();
        this.setup();
    }

    public update(deltaTime: number, speedMultiplier: number) {
        const { bg: { repeatWidth } } = config;
        this.x -= config.bg.moveIncrement * deltaTime * speedMultiplier;
        if (this.x <= repeatWidth) this.x = 0;
    }

    private setup(){
        const bg = new Sprite(Assets.get("bg.png"));
        bg.height = Manager.Height;
        bg.width = Manager.Width * 2;
        this.addChild(bg);
    }
}