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
        this.clouds = new CloudController();

        const testSprite = new Sprite(assets[0]);
        this.addChild(testSprite);
        this.addChild(this.clouds);

        this.addChild(this.player);

        this.player.position.x = (Manager.Width / 2) + (this.player.width / 2);
        this.player.position.y = (Manager.Height / 2) + (this.player.height / 2);
    }

    public update(delta: number): void {
        this.player?.update(delta);
    }
}

//TODO:
// how to create clouds, move and destroy them
// and track collisions between player and clouds
// CloudController will be a container of clouds
// it will return its children, so GameScene or some other class can get distance between player and each cloud
// cloudcontroller can update the clouds positions