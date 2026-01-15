import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v7";
import { clamp, lerp } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";
import { Manager } from "../common/Manager";

export type SpineData = {
    skeleton: string;
    atlas: string;
}

export default class FlappyPlane extends Container {
    private spine: Spine;
    private speed: number;

    constructor(spineData: SpineData) {
        super();
        this.spine = Spine.from(spineData);
        this.speed = 0;
        
        this.spine.state.setAnimation(0, "side", true);
        this.setup();
    }

    setup() {
        this.addChild(this.spine);
        this.scale.set(config.plane.scale);
        this.spine.state.data.defaultMix = config.plane.defaultMix;
    }

    public async flap() {
        this.spine.state.setAnimation(0, "up", true);
        this.spine.state.addAnimation(0, "side", true, config.plane.animationSwitch);

        this.speed = config.plane.initialJumpSeed;
    }

    public update(deltaTime: number) {
        const { plane: { rotation: { maxSpeed, minSpeed, upAngle, downAngle, smoothing } } } = config;
        this.position.y -= this.speed * deltaTime;

        this.speed -= config.plane.gravity;
        const topPos = config.plane.topPadding;
        const bottomPos = Manager.Height -config.plane.bottomPadding
        this.position.y = clamp(this.position.y, topPos, bottomPos);

        if (this.position.y == bottomPos) {
            this.speed = 0;
        }
        this.angle = lerp(this.angle, gsap.utils.mapRange(maxSpeed, minSpeed, upAngle, downAngle, this.speed), smoothing);
    }
}
