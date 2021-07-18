import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
import Button from '../classes/Button';
import Engine from '../classes/Engine';

export default class MainMenuScene extends Scene {
  private engine: Engine;
  private header: PIXI.Text;
  private button: Button;

  constructor (engine: any) {
    super();
    this.engine = engine;
  }

  public init(): void {
    this.header = new PIXI.Text('PIXI Snake', {
      fill: '#fff',
      fontSize: 96,
    });
    this.header.x = this.app.screen.width / 2;
    this.header.y = 100;
    this.header.anchor.set(0.5);
    this.addChild(this.header);

    this.button = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: this.app.screen.width / 2,
      y: 550,
      width: 400,
      height: 200,
      onClick: () => this.scenes.start('game'),
      text: 'Играть',
      callbackOnKeyUp: true,
    });
    this.addChild(this.button);

    this.button = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: this.app.screen.width / 2,
      y: 820,
      width: 400,
      height: 200,
      onClick: () => this.scenes.start('credits'),
      text: 'Кредиты',
      callbackOnKeyUp: true,
    });
    this.addChild(this.button);
  }

  public start(): void {
    this.header.angle = 0;

    // console.log('this :>> ', this.engine);
  }

  public update(delta: number): void {
    // this.header.angle += delta / 1000 * 45;
    // console.log('iotdekfjwoi')
  }
}