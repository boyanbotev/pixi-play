import { Container } from "pixi.js";
import Cloud from "./Cloud";
import { delay, Vector2 } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";

export default class CloudController extends Container {
    public isColliding = false;
    private player: Container;
    private clouds: Cloud[];
    private tweens: gsap.core.Tween[];
    private paused: boolean;
    constructor(player: Container) {
        super();
        this.player = player;
        this.tweens = [];
        this.spawn();
        this.checkColliding();
    }

    public pause() {
        this.paused = true;
        this.tweens.forEach(tween => tween.pause());
    }

    async checkColliding() {
        await delay(0.1);
        this.isColliding = this.children.filter(c => {
            var distance = Vector2.distance(c.position, this.player.position);
            return distance < 150;
        }).length > 0;

        this.checkColliding();
    }

    async spawn() {
        if (this.paused) return;
        const { duration, delays: { betweenSpawn } } = config.obstacles;

        const cloud = new Cloud(config.obstacles.spineData);
        this.addChild(cloud);
        var tween = gsap.to(cloud, { x: config.obstacles.endPosition.x, duration, ease: "none" });
        this.tweens.push(tween);

        tween.then(() => {
            this.tweens.splice(this.tweens.indexOf(tween), 1);
            cloud.destroy();
        });

        await delay(betweenSpawn);

        this.spawn();
    }
}