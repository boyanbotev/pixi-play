import { Container, Assets, Texture, Sprite } from "pixi.js";
import { IScene } from "../common/IScene";
import { Spine } from "@esotericsoftware/spine-pixi-v7";
import { Manager } from "../common/manager";
import { Controller } from "../components/Controller";


export class GameScene extends Container implements IScene {
    constructor(){
        super();
        this.createGame();
    }

    private async createGame(): Promise<void> {
        
        const testBundle = await Assets.loadBundle("testBundle");
        if (!testBundle) {
            throw new Error("Bundle not loaded");
        }
        const ids = Object.keys(testBundle);
        const assets = ids.map((id) => testBundle[id] as Texture);

        const controller = new Controller();

        var testSprite = new Sprite(assets[0]);
        this.addChild(testSprite);

        var spine = Spine.from({
            skeleton: 'spineSkeleton',
            atlas: 'spineAtlas',
        });
        this.addChild(spine);

        spine.position.x = (Manager.Width / 2) + (spine.width / 2);
        spine.position.y = (Manager.Height / 2) + (spine.height / 2);

        spine.state.data.defaultMix = 0.2;
        spine.state.setAnimation(0, "up", true);
        spine.state.addAnimation(0, "side", true, 2);
    }

    public update(delta: number): void {
    }
}