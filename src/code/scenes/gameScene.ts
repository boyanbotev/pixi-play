import { Container, Assets } from "pixi.js";
import { IScene } from "../common/IScene";
import { Manager } from "../common/Manager";
import { Controller } from "../components/Controller";
import FlappyPlane from "../components/FlappyPlane";
import { config } from "../common/config";
import CloudController from "../components/CloudController";
import ScrollingBackground from "../components/ScrollingBackground";
import { Vector2, delay } from "../common/utils";
import Button from "../components/Button";
import Particles from "../components/Particles";
import CameraShake from "../components/CameraShake";

export class GameScene extends Container implements IScene {
    private controller: Controller;
    private clouds: CloudController;
    private bg: ScrollingBackground;
    private player: FlappyPlane;
    private shake: CameraShake;
    private isGameActive: boolean = false;
    private speedMultiplier: number;

    constructor(){
        super();
        this.createGame();
    }

    private async createGame(): Promise<void> { 
        const assetsBundle = await Assets.loadBundle("assetsBundle");
        if (!assetsBundle) {
            throw new Error("Bundle not loaded");
        }

        const flappyPlaneParticles = new Particles();
        this.player = new FlappyPlane(config.plane.spineData, flappyPlaneParticles);
        this.controller = new Controller(this.player);
        this.clouds = new CloudController(this.player);
        this.bg = new ScrollingBackground();
        this.shake = new CameraShake(this);

        this.speedMultiplier = config.speedMultiplier;

        this.addChild(this.bg, this.clouds, flappyPlaneParticles, this.player);

        const playerStartPos = new Vector2(
            (Manager.Width / 2) + (this.player.width / 2), 
            (Manager.Height / 2) + (this.player.height / 2)
        );
        this.player.setStartPos(playerStartPos);

        this.createStartButton();
    }

    private createStartButton() {
        const { width, height } = config.startButton;
        const startButton = new Button(Assets.get("startButton"), width, height, () => {
            startButton.destroy();
            this.reset();
        });
        this.addChild(startButton);
        startButton.position.set(Manager.Width / 2, Manager.Height / 2);
    }

    private reset() {
        this.isGameActive = true;
        this.speedMultiplier = config.speedMultiplier;
        this.clouds.resume();
        this.player.flap();
        delay(0.05).then(() => this.controller.addListeners());
    }

    public update(delta: number): void {
        if (!this.isGameActive) return;

        if (this.clouds.isColliding) {
            this.isGameActive = false;
            this.clouds.pause();
            this.controller.dispose();
            this.loseSequence();
            return;
        }

        this.speedMultiplier += config.increaseAmount * delta;

        this.player?.update(delta, this.speedMultiplier);
        this.bg?.update(delta, this.speedMultiplier);
        this.clouds?.update(delta, this.speedMultiplier);
    }

    private async loseSequence() {
        await Promise.all([
            this.shake.shake(config.obstacles.screenShake),
            this.player.crash().then(() => this.player.return()),
            delay(config.obstacles.delays.beforeFadeOut).then(() => this.clouds.fadeOut()),
        ]);

        this.createStartButton();
    }
}
