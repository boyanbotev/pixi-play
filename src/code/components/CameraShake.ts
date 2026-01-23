import { Container } from "pixi.js";
import gsap from "gsap";

type CameraShakeOptions = {
    intensity: number;
    repeat: number;
    startDuration: number;
    endDuration: number;
    itemDuration: number;
    itemEase: string;
    startEase: string;
    endEase: string;
}

export default class CameraShake {
    private container: Container;
    private intensity: number;
    public constructor(container: Container) {
        this.container = container;
    }

    public async shake(shakeOptions: CameraShakeOptions) {
        const { intensity, repeat, startDuration, endDuration, itemDuration, itemEase, startEase, endEase } = shakeOptions;
        this.intensity = 0;

        const tl = gsap.timeline();

        gsap.to(this, { intensity: intensity, duration: startDuration, ease: startEase }).then(() => 
            gsap.to(this, { intensity: 0, duration: endDuration, ease: endEase }));
            
        for (let i = 0; i < repeat; i++) {
            await tl.to(this.container, {
                x: this.intensity,
                y: this.intensity,
                duration: itemDuration,
                ease: itemEase, 
                repeat: 1,
                yoyo: true,
            });
        }
    }
}