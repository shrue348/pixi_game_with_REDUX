import * as PIXI from 'pixi.js';
import Controller from '../singletones/Controller';

export interface IButtonProps{
  texture: PIXI.Texture;
  textureClick?: PIXI.Texture;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  scale?: number;
  controller?: string;
  callbackOnKeyUp?: boolean;
  onClick?: () => void;
}

export default class Button extends PIXI.Container {
  private textureCache: PIXI.Texture;
  private textureClickCache: PIXI.Texture;
  private texture: PIXI.Sprite;
  private text: PIXI.Text;
  private textBack: PIXI.Text;
  private controller?: string;
  private callbackOnKeyUp?: boolean;
  private isOver: boolean;
  private isDown: boolean;

  private onClick: () => void;
  

  constructor({ ...props }: IButtonProps) {
    super();

    this.x = props.x;
    this.y = props.y;
    this.width = 0;
    this.height = 0;
    this.interactive = true;
    this.buttonMode = true;
    this.pivot.x = props.width / 2;
    this.pivot.y = props.height / 2;

    this.isDown = false;

    this.textureCache = props.texture;
    this.textureClickCache = props.textureClick;
    this.texture = new PIXI.Sprite(this.textureCache);
    this.texture.anchor.set(.5);
    this.texture.x = props.width / 2;
    this.texture.y = props.height / 2;
    this.texture.width = props.width;
    this.texture.height = props.height;
    this.controller = props.controller;
    this.callbackOnKeyUp = props.callbackOnKeyUp;
    
    this.text = new PIXI.Text(props.text, { fill: '#ddd', fontSize: 65, });
    this.text.anchor.set(.5);
    this.text.x = props.width / 2;
    this.text.y = props.height / 2;

    this.textBack = new PIXI.Text(props.text, { fill: '#000', fontSize: 65, });
    this.textBack.anchor.set(.5);
    this.textBack.x = props.width / 2 + 2;
    this.textBack.y = props.height / 2 + 2;
    


    this.onClick = props.onClick;

    props.scale && this.scale.set(props.scale);

  

    this.addChild(this.texture);
    this.addChild(this.textBack);
    this.addChild(this.text);

    this
      .on('pointerdown', this.onButtonDown)
      .on('pointerup', this.onButtonUp)
      .on('pointerupoutside', this.onButtonUp)
      .on('pointerover', this.onButtonOver)
      .on('pointerout', this.onButtonOut);

  };

  onButtonDown(): void {
    if (this.textureClickCache) this.texture.texture = this.textureClickCache;
    this.isDown = true;

    !this.callbackOnKeyUp
      && this.onClick
      && this.onClick();

    if (this.controller) {
      let payload = {} as { [key: string]: boolean };
      payload[this.controller] = true;

      Controller.update(payload);
    }
  };

  onButtonUp(): void {
    this.texture.texture = this.textureCache;
    this.isDown = false;

    this.callbackOnKeyUp
      && this.onClick
      && this.onClick();

    if (this.controller) {
      let payload = {} as { [key: string]: boolean };
      payload[this.controller] = false;

      Controller.update(payload);
    }
  };

  onButtonOver(): void {
    this.isOver = true;
  };

  onButtonOut(): void {
    this.isOver = false;
  };

  hide(): void {
    this.visible = false;
  };

  show(): void {
    this.visible = true;
  };
}
