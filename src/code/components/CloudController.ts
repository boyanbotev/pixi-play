import { Container } from "pixi.js";
import Cloud from "./Cloud";
import { delay, Vector2 } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";

export default class CloudController extends Container {
    public isColliding = false;
    private player: Container;
    private tweens: gsap.core.Tween[];
    private clouds: Cloud[];
    private paused: boolean;
    constructor(player: Container) {
        super();
        this.player = player;
        this.tweens = [];
        this.clouds = []
        this.spawn();
        this.checkColliding();
    }

    public pause() {
        this.paused = true;
        this.tweens.forEach(tween => tween.pause());
    }

    public resume() {
        this.paused = false;
        this.tweens.forEach(tween => tween.play());
        this.checkColliding();
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

    async spawn() {
        if (this.paused) return;
        const { duration, delays: { betweenSpawn } } = config.obstacles;

        const cloud = new Cloud(config.obstacles.spineData);
        this.addChild(cloud);
        this.clouds.push(cloud);
        var tween = gsap.to(cloud, { x: config.obstacles.endPosition.x, duration, ease: "none" });
        this.tweens.push(tween);

        tween.then(() => {
            this.tweens.splice(this.tweens.indexOf(tween), 1);
            this.clouds.splice(this.clouds.indexOf(cloud), 1);
            cloud.destroy();
        });

        await delay(betweenSpawn);

        this.spawn();
    }
}