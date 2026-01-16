import { Sprite, Texture, Container } from "pixi.js";
import gsap from "gsap";

export default class Button extends Container {   
    private tween: gsap.core.Tween;
    constructor(texture: Texture, width: number, height: number, cb: () => void) {
        super();
        const button = Sprite.from(texture);
        this.addChild(button);
        button.interactive = true;
        button.on("pointerdown", cb);
        button.anchor.set(0.5);
        button.width = width;
        button.height = height;
        this.tween = null;
        this.animate();
    }

    private animate() {
        const { width, height } = this;
        // squash and stretch
        this.tween = gsap.to(this, { height: height * 1.05, width: width * 1.05, ease: "power1.inOut", duration: 1, repeat: -1 }).yoyo(true);

    }

    public destroy() {
        this.tween.kill();
        super.destroy();
    }

}