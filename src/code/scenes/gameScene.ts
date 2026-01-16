import { Container, Assets, Texture, Sprite } from "pixi.js";
import { IScene } from "../common/IScene";
import { Manager } from "../common/Manager";
import { Controller } from "../components/Controller";
import FlappyPlane from "../components/FlappyPlane";
import { config } from "../common/config";
import CloudController from "../components/CloudController";
import ScrollingBackground from "../components/ScrollingBackground";
import { Vector2, delay } from "../common/utils";


export class GameScene extends Container implements IScene {
    private controller: Controller;
    private clouds: CloudController;
    private bg: ScrollingBackground;
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

        this.player = new FlappyPlane(config.plane.spineData);
        this.controller = new Controller(this.player);
        this.clouds = new CloudController(this.player);
        this.bg = new ScrollingBackground();

        this.addChild(this.bg);
        this.addChild(this.clouds);
        this.addChild(this.player);

        const playerStartPos = new Vector2(
            (Manager.Width / 2) + (this.player.width / 2), 
            (Manager.Height / 2) + (this.player.height / 2)
        );
        this.player.setStartPos(playerStartPos);
    }

    public update(delta: number): void {
        if (this.isGameOver) return;

        if (this.clouds.isColliding) {
            this.isGameOver = true;
            this.clouds.pause();
            this.controller.dispose();
            this.loseSequence();
            return;
        }

        this.player?.update(delta);
        this.bg?.update();
    }

    private async loseSequence() {
        await Promise.all([
            this.player.crash().then(() => this.player.return()),
            delay(config.obstacles.delays.beforeFadeOut).then(() => this.clouds.fadeOut()),
        ]);

        this.clouds.resume();
        this.controller.addListeners();
        this.isGameOver = false;
    }
}
