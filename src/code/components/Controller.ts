import FlappyPlane  from "./FlappyPlane";

export class Controller {
  private player: FlappyPlane;

  constructor(player: FlappyPlane) {
    this.player = player;
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('mousedown', this.mousedownHandler);
  }

  private mousedownHandler = (event: MouseEvent): void => {
    this.player.flap();
  }

  private keydownHandler = (event: KeyboardEvent): void => {
    this.player.flap();
  };

  dispose(): void {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('mousedown', this.mousedownHandler);
  }
}