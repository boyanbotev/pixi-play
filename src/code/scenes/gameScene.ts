import { Container, Assets, Texture, Sprite } from "pixi.js";
import { IScene } from "../common/IScene";
import { Manager } from "../common/Manager";
import { Controller } from "../components/Controller";
import FlappyPlane from "../components/FlappyPlane";


export class GameScene extends Container implements IScene {
    private controller: Controller;
    private player: FlappyPlane;
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

        this.player = new FlappyPlane({
            skeleton: 'spineSkeleton',
            atlas: 'spineAtlas',
        });
        this.controller = new Controller(this.player);

        var testSprite = new Sprite(assets[0]);
        this.addChild(testSprite);

        this.addChild(this.player);

        this.player.position.x = (Manager.Width / 2) + (this.player.width / 2);
        this.player.position.y = (Manager.Height / 2) + (this.player.height / 2);
    }

    public update(delta: number): void {
        this.player?.update(delta);
    }
}