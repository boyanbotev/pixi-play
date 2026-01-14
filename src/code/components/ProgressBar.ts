import { Container, Graphics } from "pixi.js";

export class ProgressBar extends Container {
    private fill: Graphics;
    private border: Graphics;

    constructor(width: number, height: number) {
        super();

        this.border = new Graphics();
        this.border.lineStyle(4, 0x000000, 1);
        this.border.drawRect(0, 0, width, height);

        this.fill = new Graphics();
        this.fill.beginFill(0x00ff00, 1);
        this.fill.drawRect(0, 0, width, height);
        this.fill.endFill();
        
        this.fill.scale.x = 0;

        this.addChild(this.fill, this.border);
    }

    public setProgress(progress: number) {
        this.fill.scale.x = Math.min(Math.max(progress, 0), 1);
    }
}