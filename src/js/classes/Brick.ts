import * as PIXI from 'pixi.js';
import { randomInt } from '../helper/helper';
import Game from '../game/Game';

export default class Brick extends PIXI.Container {
  private game: Game;
  public XX: number;
  public YY: number;

  constructor(
    game: Game,
  ) {
    super();

    this.game = game;
    this.XX = 8;
    this.YY = 8;
    this.x = 0;
    this.y = 0;
    this.width = this.game.cellWidth;
    this.height = this.game.cellHeight;

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x557655);
    graphics.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    graphics.endFill();
    this.addChild(graphics);

    this.draw();
  };

  public draw() {
    this.x = this.XX * this.game.cellWidth;
    this.y = this.YY * this.game.cellHeight;
  }

  public setNewCoords() {
    do {
      this.XX = randomInt(0, this.game.cellCount - 1);
      this.YY = randomInt(0, this.game.cellCount - 1);
    } while (
      this.game.player.tailCoords.some((el) => (
        el[0] === this.XX
        && el[1] === this.YY
      ))
    )
  }
};
