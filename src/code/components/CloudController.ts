import { Container } from "pixi.js";
import Cloud from "./Cloud";
import { delay } from "../common/utils";
import { config } from "../common/config";

export default class CloudController extends Container {
    constructor() {
        super();
        this.spawn();
    }

    async spawn() {
        const { duration, delays: { betweenSpawn } } = config.obstacles;
        
        const cloud = new Cloud(config.obstacles.spineData);
        this.addChild(cloud);
        cloud.move(duration);

        await delay(betweenSpawn);

        this.spawn();
    }
}