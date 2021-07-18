import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
import Button from '../classes/Button';

export default class CreditsScene extends Scene {
  private header: PIXI.Text;
  private button: Button;

  public init(): void {
    this.header = new PIXI.Text('Кредиты', {
      fill: '#fff',
      fontSize: 36,
    });
    this.header.x = this.app.screen.width / 2;
    this.header.y = 100;
    this.header.anchor.set(0.5);
    this.addChild(this.header);

    this.button = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: this.app.screen.width / 2,
      y: 300,
      width: 200,
      height: 100,
      onClick: () => this.scenes.start('mainMenu'),
      text: 'Назад',
      callbackOnKeyUp: true,
    });

    this.addChild(this.button);
  }

  public start(): void {
    this.header.angle = 0;
  }

  public update(delta: number): void {

  }
}