import { Container } from "pixi.js";
import { SpineData } from "./FlappyPlane";
import { Spine } from "@esotericsoftware/spine-pixi-v7";
import gsap from "gsap";
import { config } from "../common/config";
import { getRandomFloat, getRandomInt } from "../common/utils";

export default class Cloud extends Container { // TODO: create base SpineCover class
    spine: Spine;
    constructor(spineData: SpineData) {
        super();
        this.spine = Spine.from(spineData);
        this.addChild(this.spine);
        this.setup();
    }

    setup() {
        const { minAnimation, animations, startPosition, tint, minScale, maxScale, yDifferentiation } = config.obstacles;
        this.spine.state.setAnimation(0, `cloud${getRandomInt(minAnimation, animations)}`, true);
        this.position.set(startPosition.x, startPosition.y);
        this.spine.tint = Number(tint);
        this.scale.set(getRandomFloat(minScale, maxScale));
        this.position.y += getRandomFloat(-yDifferentiation, yDifferentiation);
    }
    // TODO: randomize cloud animation, size and y position based on config

    public async move(duration: number) {
        await gsap.to(this, { x: config.obstacles.endPosition.x, duration, ease: "none" });
        this.destroy();
    }
}