import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
import Button from '../classes/Button';
import Game from '../game/Game';

export default class BetweenGameScene extends Scene {
  private game: Game;
  private header: PIXI.Text;
  private button: Button;
  private button2: Button;

  public init(): void {
    this.header = new PIXI.Text('', {
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
      onClick: () => this.scenes.start('game'),
      text: 'начать',
      callbackOnKeyUp: true,
    });

    this.addChild(this.button);

    this.button2 = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: this.app.screen.width / 2,
      y: 450,
      width: 200,
      height: 100,
      onClick: () => this.scenes.start('mainMenu'),
      text: 'Главное меню',
      callbackOnKeyUp: true,
    });

    this.addChild(this.button2);
  }

  public start(): void {
    this.header.text = `Уровень ${1}`;
    this.header.angle = 0;
  }

  public update(delta: number): void {

  }
}