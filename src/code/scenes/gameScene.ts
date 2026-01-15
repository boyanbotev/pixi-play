import { Container, Assets, Texture, Sprite } from "pixi.js";
import { IScene } from "../common/IScene";
import { Manager } from "../common/Manager";
import { Controller } from "../components/Controller";
import FlappyPlane from "../components/FlappyPlane";
import { config } from "../common/config";
import CloudController from "../components/CloudController";


export class GameScene extends Container implements IScene {
    private controller: Controller;
    private clouds: CloudController;
    private player: FlappyPlane;
    private isGameOver: boolean = false;
    constructor(){
        super();
        this.createGame();
    }

    private async createGame(): Promise<void> {
        
        const assetsBundle = await Assets.loadBundle("assetsBundle");
        if (!assetsBundle) {
            throw new Error("Bundle not loaded");
        }
        const ids = Object.keys(assetsBundle);
        const assets = ids.map((id) => assetsBundle[id] as Texture);

        this.player = new FlappyPlane(config.plane.spineData);
        this.controller = new Controller(this.player);
        this.clouds = new CloudController(this.player);

        const testSprite = new Sprite(assets[0]);
        this.addChild(testSprite);
        this.addChild(this.clouds);

        this.addChild(this.player);

        this.player.position.x = (Manager.Width / 2) + (this.player.width / 2);
        this.player.position.y = (Manager.Height / 2) + (this.player.height / 2);
    }

    public update(delta: number): void {
        if (this.isGameOver) return;
        if (this.clouds.isColliding) {
            this.isGameOver = true;
            this.clouds.pause();
            this.controller.dispose();
            return;
        }
        this.player?.update(delta);
    }
}
