import { Container } from "pixi.js";
import Cloud from "./Cloud";
import { delay } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";

export default class CloudController extends Container {
    public isColliding = false;
    private player: Container;
    private tweens: gsap.core.Tween[];
    private clouds: Cloud[];
    private paused: boolean;
    private speedMultiplier: number;

    constructor(player: Container) {
        super();
        this.speedMultiplier = 1;
        this.player = player;
        this.tweens = [];
        this.clouds = []
        this.paused = true;
    }

    public pause() {
        this.paused = true;
        this.tweens.forEach(tween => tween.pause());
    }

    public resume() {
        this.paused = false;
        this.isColliding = false;
        this.spawn();
        this.checkColliding();
    }

    public async fadeOut() {
        const { fadeOut: { duration, ease } } = config.obstacles;

        await gsap.to(this, { alpha: 0, duration, ease });
        this.clouds.forEach(cloud => cloud.destroy());
        this.clouds = [];
        this.tweens = [];
        this.alpha = 1;
    }

    async checkColliding() {
        if (this.paused) return;

        await delay(0.1);
        this.isColliding = this.clouds.filter(cloud =>  {
            var localPos = cloud.toLocal(this.player.position);

            if (localPos.x > cloud.size().x / 2 || 
                localPos.y > cloud.size().y / 2 || 
                localPos.x < -cloud.size().x / 2|| 
                localPos.y < -cloud.size().y / 2) {
                return false;
            }
            return true;
        }).length > 0;

        this.checkColliding();
    }

    async update(deltaTime: number, speedMultiplier: number) {
        if (this.paused) return;
        this.speedMultiplier = speedMultiplier;
        this.tweens.forEach(tween => tween.timeScale(speedMultiplier));
    }

    async spawn() {
        if (this.paused) return;
        const { move: { ease, betweenSpawnDistance, baseSpeed } } = config.obstacles;

        const cloud = new Cloud(config.obstacles.spineData);
        this.addChild(cloud);
        this.clouds.push(cloud);
        var tween = gsap.to(cloud, { x: config.obstacles.endPosition.x, duration: config.obstacles.move.duration, ease });
        this.tweens.push(tween);

        var betweenSpawnDelay = betweenSpawnDistance / (baseSpeed * this.speedMultiplier);

        tween.then(() => {
            this.tweens.splice(this.tweens.indexOf(tween), 1);
            this.clouds.splice(this.clouds.indexOf(cloud), 1);
            cloud.destroy();
        });

        await delay(betweenSpawnDelay);

        this.spawn();
    }
}