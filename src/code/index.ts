import { Manager } from "./common/Manager";
import { LoaderScene } from "./scenes/LoaderScene";

Manager.initialize(1600, 900, 0x939798);

const loaderScene = new LoaderScene();
Manager.changeScene(loaderScene);