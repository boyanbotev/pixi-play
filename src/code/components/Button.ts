import { Sprite, Texture, Container } from "pixi.js";

export default class Button extends Container {   

    constructor(texture: Texture, width: number, height: number, cb: () => void) {
        super();
        const button = Sprite.from(texture);
        this.addChild(button);
        button.interactive = true;
        button.on("pointerdown", cb);
        button.anchor.set(0.5);
        button.width = width;
        button.height = height;
    }

}