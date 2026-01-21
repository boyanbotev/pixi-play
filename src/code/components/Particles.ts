import { Vector2 } from "../common/utils";
import { Sprite, Assets, BLEND_MODES, Container } from "pixi.js";
import gsap from "gsap";
import { config } from "../common/config";

export default class Particles extends Container {
    emitTimer: number = 0;

    update(position: Vector2, deltaTime: number, speedMultiplier: number) {
        this.emitTimer += deltaTime;
        if (this.emitTimer > config.particles.emitInterval) {
            this.emitTimer = 0;
            this.create(position, speedMultiplier);
        }
    }

    create(position: Vector2, speedMultiplier: number) {
        const { particles: { offset: { x, y }, startAlpha, startScale } } = config;

        const particle = new Sprite(Assets.get("particle"));

        particle.blendMode = BLEND_MODES.ADD;
        particle.position.set(position.x + x, position.y + y);
        particle.scale.set(startScale);
        particle.alpha = startAlpha;
        particle.x -= particle.width / 2;
        particle.y -= particle.height / 2;

        this.addChild(particle);
        this.animate(particle, position, speedMultiplier);
    }

    async animate(particle: Sprite, position: Vector2, speedMultiplier: number) {
        const { particles: { tween: { tint, duration, baseSpeed } } } = config;
        await gsap.to(
            particle, 
            { 
                alpha: 0, 
                tint, 
                x: position.x - speedMultiplier * baseSpeed, 
                duration 
            }
        );
        particle.destroy();
    }
}