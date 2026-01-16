import { Container, Graphics } from "pixi.js";
import { config } from "../common/config";

export class ProgressBar extends Container {
    private fill: Graphics;
    private border: Graphics;

    constructor(width: number, height: number) {
        super();

        const { loaderBar: { fillColor, borderColor, borderWidth, widthMultiplier, heightMultiplier } } = config;

        const loaderBarWidth = width * widthMultiplier;
        const loaderBarHeight = height * heightMultiplier;
        this.position.x = (width - loaderBarWidth) / 2;
        this.position.y = (height - loaderBarHeight) / 2;

        this.border = new Graphics();
        this.border.lineStyle(borderWidth, borderColor, 1);
        this.border.drawRect(0, 0, loaderBarWidth, loaderBarHeight);

        this.fill = new Graphics();
        this.fill.beginFill(fillColor, 1);
        this.fill.drawRect(0, 0, loaderBarWidth, loaderBarHeight);
        this.fill.endFill();
        
        this.fill.scale.x = 0;

        this.addChild(this.fill, this.border);
    }

    public setProgress(progress: number) {
        this.fill.scale.x = Math.min(Math.max(progress, 0), 1);
    }
}