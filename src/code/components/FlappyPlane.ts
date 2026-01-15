import { Container } from "pixi.js";
import { Spine, Vector2 } from "@esotericsoftware/spine-pixi-v7";
import { clamp, lerp } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";
import { Manager } from "../common/Manager";
import MotionPathPlugin from "gsap/MotionPathPlugin";

export type SpineData = {
    skeleton: string;
    atlas: string;
}

gsap.registerPlugin(MotionPathPlugin) 

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
        this.spine.tint = Number(config.plane.tint);
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

    /**
     * Swing the plane around in an arc and tween offscreen.
     */
    public async crash() {
        const { crash: { rotation, movement, positionIterations, distance } } = config.plane;

        var dir = new Vector2(-this.x, -this.y); // to top left hand corner
        const targetAngle = this.getAngleFacing(dir);
        let angle = this.angle;
        let pos = { x: this.x, y: this.y };

        const positions = [];
        const angles = [];
        for (let i = 0; i < positionIterations; i++) {
            angle = lerp(angle, targetAngle, 0.1);

            const angleRad = angle * (Math.PI / 180);

            const x = pos.x + distance * Math.cos(angleRad);
            const y = pos.y + distance * Math.sin(angleRad);
            pos = { x, y };
            positions.push({ x, y });
            angles.push({ angle });
        }

        gsap.to(this, {
            motionPath: {
                path: angles,
                curviness: rotation.curviness,
            },
            duration: rotation.duration,
            ease: rotation.ease,
        });

        gsap.to(this, {
            motionPath: {
                path: positions,
                curviness: movement.curviness,
            },
            duration: movement.duration,
            ease: movement.ease,
        });
    }

    getAngleFacing(dir: Vector2) {
        let angleRad = Math.atan2(dir.y, dir.x);
        let angleDeg = angleRad * (180 / Math.PI);
        return (angleDeg + 360) % 360;
    }
}
