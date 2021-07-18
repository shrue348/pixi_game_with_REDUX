import Controller from "./Controller";

type Keys = { [name :string]: string }

const keys = {
  'w': 'Up',
  's': 'Down',
  'a': 'Left',
  'd': 'Right',
  'r': 'Restart',
  'ArrowUp': 'Up',
  'ArrowDown': 'Down',
  'ArrowLeft': 'Left',
  'ArrowRight': 'Right',
  ' ': 'Jump',
};

class Keyboard {
  private keys: Keys;
  public pressedKeys: Set<unknown>;
  public deviceOrientation: { [key: string]:number }

  constructor () {
    this.keys = keys;
    this.pressedKeys = new Set();
    this.deviceOrientation = {
      alpha: 0,
      gamma: 0,
      beta: 0,
    }

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keys[e.key] && this.pressedKeys.add(this.keys[e.key]);
      this.updateController();
    });
    
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keys[e.key] && this.pressedKeys.delete(this.keys[e.key])
      this.updateController();
    });

    // if (window.DeviceOrientationEvent) {
    //   window.addEventListener("deviceorientation", (event) => {
    //     this.deviceOrientation.alpha = event.alpha;
    //     this.deviceOrientation.gamma = event.gamma;
    //     this.deviceOrientation.beta = event.beta;

    //     Controller.updateOrientation(this.deviceOrientation);
    //   }, true);
    // }

  }


  updateController () {
    let payload = {} as { [key: string]: boolean }

    if (this.pressedKeys.has('Up')) payload.up = true
    else payload.up = false;
    
    if (this.pressedKeys.has('Down')) payload.down = true
    else payload.down = false;

    if (this.pressedKeys.has('Left')) payload.left = true
    else payload.left = false;

    if (this.pressedKeys.has('Right')) payload.right = true
    else payload.right = false;

    if (this.pressedKeys.has('Restart')) payload.restart = true
    else payload.restart = false;

    if (this.pressedKeys.has('Jump')) payload.jump = true
    else payload.jump = false;

    Controller.update(payload);
  }
}

export default new Keyboard();