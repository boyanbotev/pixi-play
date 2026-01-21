import { Container, ObservablePoint } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v7";
import { clamp, lerp, delay } from "../common/utils";
import { config } from "../common/config";
import gsap from "gsap";
import { Manager } from "../common/Manager";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { Vector2 } from "../common/utils";
import Particles from "./Particles";

export type SpineData = {
    skeleton: string;
    atlas: string;
}

gsap.registerPlugin(MotionPathPlugin) 

export default class FlappyPlane extends Container {
    private spine: Spine;
    private speed: number;
    private startPos: Vector2;
    private particles: Particles;
    private isFlapping: boolean = false;
    private rotationTl: gsap.core.Timeline;

    constructor(spineData: SpineData, particles: Particles) {
        super();
        this.spine = Spine.from(spineData);
        this.particles = particles;
        this.speed = 0;
        this.pivot.set(this.width / 2, this.height / 2);
        
        this.setup();
    }

    setup() {
        this.spine.state.setAnimation(0, "side", true);
        this.addChild(this.spine);
        this.scale.set(config.plane.scale);
        this.spine.state.data.defaultMix = config.plane.defaultMix;
        this.spine.tint = config.plane.tint;
    }

    public setStartPos(pos: Vector2) {
        this.startPos = pos;
        this.position.set(pos.x, pos.y);
    }

    public async flap() {
        const { plane: { initialJumpSeed, flapLength, animationSwitch } } = config;

        this.spine.state.setAnimation(0, "up", true);
        this.spine.state.addAnimation(0, "side", true, animationSwitch);
        this.rotate();

        this.speed = initialJumpSeed;
        this.isFlapping = true;

        await delay(flapLength);

        this.isFlapping = false;
    }

    public update(deltaTime: number, speedMultiplier: number) {
        this.position.y -= this.speed * speedMultiplier * deltaTime;
        this.speed -= config.plane.gravity * speedMultiplier * deltaTime;

        const topPos = config.plane.topPadding;
        const bottomPos = Manager.Height -config.plane.bottomPadding
        this.position.y = clamp(this.position.y, topPos, bottomPos);

        if (this.position.y == bottomPos) {
            this.speed = 0;
            this.rotationTl?.kill();
            this.angle = 0;
        }

        if (this.isFlapping) {
            this.particles.create(new Vector2(this.x, this.y), speedMultiplier);
        }
    }

    /**
     * Swing the plane around in an arc and tween offscreen.
     */
    public async crash() {
        const { crash: { rotation, movement, positionIterations, distance, lerpSmoothing } } = config.plane;

        var dir = new Vector2(-this.x, -this.y); // to top left hand corner
        const targetAngle = this.getAngleFacing(dir);

        let angle = this.angle;
        let pos = { x: this.x, y: this.y };
        const positions = [];
        const angles = [];

        for (let i = 0; i < positionIterations; i++) {
            angle = lerp(angle, targetAngle, lerpSmoothing);

            const angleRad = angle * (Math.PI / 180);
            const x = pos.x + distance * Math.cos(angleRad);
            const y = pos.y + distance * Math.sin(angleRad);

            pos = { x, y };
            positions.push({ x, y });
            angles.push({ angle });
        }

        await Promise.all([
            gsap.to(this, {
                motionPath: {
                    path: angles,
                    curviness: rotation.curviness,
                },
                duration: rotation.duration,
                ease: rotation.ease,
            }),

            gsap.to(this, {
                motionPath: {
                    path: positions,
                    curviness: movement.curviness,
                },
                duration: movement.duration,
                ease: movement.ease,
            })
        ]);
    }

    public async return() {
        const { duration, ease } = config.plane.return;
        this.angle = 0;
        await gsap.to(this, { ...this.startPos, duration, ease });
    }

    private rotate() {
        const { plane: { rotation: { up, down } } } = config;

        if (this.rotationTl) this.rotationTl.kill();
        this.rotationTl = gsap.timeline();
        this.rotationTl.add(gsap.to(this, { ...up }));
        this.rotationTl.add(gsap.to(this, { ...down }));
    }

    getAngleFacing(dir: Vector2) {
        let angleRad = Math.atan2(dir.y, dir.x);
        let angleDeg = angleRad * (180 / Math.PI);
        return (angleDeg + 360) % 360;
    }
}
