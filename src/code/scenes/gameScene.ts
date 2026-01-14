import { Container, Assets, Texture, Sprite } from "pixi.js";
import { IScene } from "../common/IScene";

export class GameScene extends Container implements IScene {
    constructor(){
        super();
        this.createGame();
    }

    private async createGame(): Promise<void> {
        
        const testBundle = await Assets.loadBundle("testBundle");
        if (!testBundle) {
            throw new Error("Bundle not loaded");
        }
        const ids = Object.keys(testBundle);
        const assets = ids.map((id) => testBundle[id] as Texture);
        console.log(assets);

        var testSprite = new Sprite(assets[0]);
        this.addChild(testSprite);
    }

    public update(delta: number): void {
    }
}