import { Container, Graphics, Assets } from "pixi.js";
import { Manager } from "../common/Manager";
import { IScene } from "../common/IScene";
import { manifest } from "../assets";
import { GameScene } from "./GameScene";
import { ProgressBar } from "../components/ProgressBar";

export class LoaderScene extends Container implements IScene {

    private loaderBar: ProgressBar;

    constructor() {
        super();

        this.loaderBar = new ProgressBar(Manager.Width, Manager.Height);
        this.addChild(this.loaderBar);

        this.initializeLoader().then(() => {
            this.gameLoaded();
        });

    }

    private async initializeLoader(): Promise<void> {
        await Assets.init({ manifest: manifest });

        const bundleIds = manifest.bundles.map((bundle) => bundle.name);

        await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progress: number): void {
        this.loaderBar.setProgress(progress);
    }

    private gameLoaded(): void {
        Manager.changeScene(new GameScene());
    }

    public update(delta: number): void {
    }
}