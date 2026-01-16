import FlappyPlane  from "./FlappyPlane";

export class Controller {
  private player: FlappyPlane;

  constructor(player: FlappyPlane) {
    this.player = player;
  }

  private mousedownHandler = (event: MouseEvent): void => {
    this.player.flap();
  }

  private keydownHandler = (event: KeyboardEvent): void => {
    this.player.flap();
  };

  public addListeners(): void {
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('mousedown', this.mousedownHandler);
  }

  public dispose(): void {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('mousedown', this.mousedownHandler);
  }
}