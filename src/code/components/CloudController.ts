import { Container } from "pixi.js";
import Cloud from "./Cloud";
import { delay } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";

export default class CloudController extends Container {
    public isColliding = false;
    private player: Container;
    private clouds: Cloud[];
    private paused: boolean;
    private speedMultiplier: number;

    constructor(player: Container) {
        super();
        this.speedMultiplier = config.speedMultiplier;
        this.player = player;
        this.clouds = []
        this.paused = true;
    }

    public pause() {
        this.paused = true;
        this.clouds.forEach(cloud => cloud.tween.kill());
    }

    public resume() {
        this.paused = false;
        this.isColliding = false;
        this.speedMultiplier = config.speedMultiplier;
        this.spawn();
        this.checkColliding();
    }

    public async fadeOut() {
        const { fadeOut: { duration, ease } } = config.obstacles;

        await gsap.to(this, { alpha: 0, duration, ease });
        this.clouds.forEach(cloud => cloud.destroy());
        this.clouds = [];
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
        this.clouds.forEach(cloud => cloud.tween.timeScale(speedMultiplier));
    }

    async spawn() {
        if (this.paused) return;
        const { move: { ease, betweenSpawnDistance, baseSpeed } } = config.obstacles;

        const cloud = new Cloud(config.obstacles.spineData);
        this.addChild(cloud);
        this.clouds.push(cloud);
        cloud.tween = gsap.to(cloud, { x: config.obstacles.endPosition.x, duration: config.obstacles.move.duration, ease });

        var betweenSpawnDelay = betweenSpawnDistance / (baseSpeed * this.speedMultiplier);

        cloud.tween.then(() => {
            this.clouds.splice(this.clouds.indexOf(cloud), 1);
            cloud.destroy();
        });

        await delay(betweenSpawnDelay);

        this.spawn();
    }
}