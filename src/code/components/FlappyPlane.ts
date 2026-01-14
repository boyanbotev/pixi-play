import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v7";
import { clamp, lerp } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";
import { Manager } from "../common/Manager";

type SpineData = {
    skeleton: string;
    atlas: string;
}

export default class FlappyPlane extends Container {
    private spine: Spine;
    private isFlapping: boolean;
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
        this.spine.state.data.defaultMix = config.plane.defaultMix;
    }

    public async flap() {
        //if (this.isFlapping) return;

        this.spine.state.setAnimation(0, "up", true);
        this.spine.state.addAnimation(0, "side", true, config.plane.animationSwitch);

        //this.isFlapping = true;
        this.speed = config.plane.initialJumpSeed;

        //this.isFlapping = false;
    }

    public update(deltaTime: number) {
        const { plane: { rotation: { maxSpeed, minSpeed, upAngle, downAngle, smoothing } } } = config;
        this.position.y -= this.speed * deltaTime;

        this.speed -= config.plane.gravity;
        var bottomPos = Manager.Height -config.plane.bottomPadding
        this.position.y = clamp(this.position.y, 0, bottomPos);

        if (this.position.y == bottomPos) {
            this.speed = 0;
        }
        this.angle = lerp(this.angle, gsap.utils.mapRange(maxSpeed, minSpeed, upAngle, downAngle, this.speed), smoothing);
    }
}
