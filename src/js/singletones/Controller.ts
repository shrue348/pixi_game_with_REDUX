import Keyboard from "./Keyboard";

export interface IController {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  restart: boolean;
  cameraLeft: boolean;
  cameraRight: boolean;
  cameraUp: boolean;
  cameraDown: boolean;
  orientation: {[key: string]: number};

  updateOrientation: (orientation: any) => void;
  update: (props: {[key: string]: boolean}) => void;
}

const Controller: IController = {
  restart: false,
  jump: false,
  up: false,
  down: false,
  left: false,
  right: false,

  cameraLeft: false,
  cameraRight: false,
  cameraUp: false,
  cameraDown: false,

  orientation: {
    alpha: 0,
    gamma: 0,
    beta: 0,
  },

  updateOrientation: (orientation) => {
    Controller.orientation = orientation;
  },

  update: (props: any) => {
    if (props.up !== undefined) Controller.up = props.up;
    if (props.down !== undefined) Controller.down = props.down;
    if (props.left !== undefined) Controller.left = props.left;
    if (props.right !== undefined) Controller.right = props.right;
    if (props.restart !== undefined) Controller.restart = props.restart;

    // if (Controller.up) console.log('controller', Controller.up)
    // console.log('controller', Controller.up)
  },
};

export default Controller;
