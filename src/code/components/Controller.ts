type Action = 'up' | 'left' | 'down' | 'right' | 'space';

interface KeyState {
  pressed: boolean;
  doubleTap: boolean;
  timestamp: number;
}

const keyMap: Record<string, Action> = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
};

export class Controller {
  public keys: Record<Action, KeyState> = {
    up: { pressed: false, doubleTap: false, timestamp: 0 },
    left: { pressed: false, doubleTap: false, timestamp: 0 },
    down: { pressed: false, doubleTap: false, timestamp: 0 },
    right: { pressed: false, doubleTap: false, timestamp: 0 },
    space: { pressed: false, doubleTap: false, timestamp: 0 },
  };

  constructor() {
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  private keydownHandler = (event: KeyboardEvent): void => {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();
    const state = this.keys[key];

    state.doubleTap = state.doubleTap || (now - state.timestamp < 300);
    state.pressed = true;
  };

  private keyupHandler = (event: KeyboardEvent): void => {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();
    const state = this.keys[key];

    state.pressed = false;

    if (state.doubleTap) {
      state.doubleTap = false;
    } else {
      state.timestamp = now;
    }
  };

  public dispose(): void {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
  }
}