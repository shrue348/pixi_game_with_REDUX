import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
import Button from '../classes/Button';
import Engine from '../classes/Engine';
import Game from '../game/Game';

export default class GameScene extends Scene {
  private engine: Engine;
  private game: Game;
  private scoreText: PIXI.Text;

  private restartBtn: Button;
  private backBtn: Button;
  private leftBtn: Button;
  private rightBtn: Button;
  private upBtn: Button;
  private downBtn: Button;

  public gameOVer: () => void;

  constructor (engine: any) {
    super();
    this.engine = engine;
  }

  public init(): void {
    this.engine.store.subscribe(() => this.updateScore(this.engine.store.getState()))
    this.addChild(this.engine.game);

    this.scoreText = new PIXI.Text('0', {
      fill: '#fff',
      fontSize: 82,
    });
    this.scoreText.x = 10;
    this.scoreText.y = 10;
    this.addChild(this.scoreText);

    this.backBtn = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: 980,
      y: 55,
      width: 400,
      height: 200,
      scale: .4,
      onClick: () => this.back(),
      text: 'Назад',
      callbackOnKeyUp: true,
    });
    this.addChild(this.backBtn);

    this.restartBtn = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: this.app.screen.width / 2,
      y: 455,
      width: 400,
      height: 200,
      onClick: () => this.start(),
      text: 'Рестарт',
      callbackOnKeyUp: true,
    });
    this.restartBtn.visible = false;
    this.addChild(this.restartBtn);

    this.leftBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 370,
      y: 1420,
      width: 190,
      height: 190,
      controller: 'left',
      text: '←',
    });
    this.addChild(this.leftBtn);

    this.rightBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 710,
      y: 1420,
      width: 190,
      height: 190,
      controller: 'right',
      text: '→',
    });
    this.addChild(this.rightBtn);

    this.downBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: this.app.screen.width / 2,
      y: 1530,
      width: 190,
      height: 190,
      controller: 'down',
      text: '↓',
    });
    this.addChild(this.downBtn);

    this.upBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: this.app.screen.width / 2,
      y: 1310,
      width: 190,
      height: 190,
      controller: 'up',
      text: '↑',
    });
    this.addChild(this.upBtn);

  }

  public updateScore(state: IInitialState) {
    console.log('state.game.score', state.game)
    this.scoreText.text = state.game.score.toString();
  }

  public start(): void {
    this.restartBtn.visible = false;
    this.backBtn.visible = true;
    this.leftBtn.visible = true;
    this.rightBtn.visible = true;
    this.upBtn.visible = true;
    this.downBtn.visible = true;
    this.engine.game.startNewGame();
  }

  public stop(): void {

  }

  public back() {
    this.gameOver();
    this.scenes.start('mainMenu');
  }

  public gameOver() {
    this.restartBtn.visible = true;
    this.backBtn.visible = false;
    this.leftBtn.visible = false;
    this.rightBtn.visible = false;
    this.upBtn.visible = false;
    this.downBtn.visible = false;
    console.log(this.engine);
    // this.engine.game.gameOver();
  }

  public update(delta: number): void {


    
  }
}
