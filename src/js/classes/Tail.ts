import * as PIXI from 'pixi.js';
import { randomInt } from '../helper/helper';
import Player from './Player';

export default class Tail extends PIXI.Graphics {
  private player: Player;
  public XX: number;
  public YY: number;

  constructor(
    player: Player,
    x: number,
    y: number,
  ) {
    super();

    this.player = player;
    this.XX = 0;
    this.YY = 0;
    this.x = x * this.player.game.cellHeight;
    this.y = y * this.player.game.cellHeight;
    this.width = this.player.game.cellWidth;
    this.height = this.player.game.cellHeight;

    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xaabbaa);
    graphics.drawRect(this.XX * this.player.game.cellWidth, this.YY * this.player.game.cellHeight, this.player.game.cellWidth, this.player.game.cellHeight);
    graphics.endFill();
    this.addChild(graphics);
  };

  public draw() {
    this.x = this.XX * this.player.game.cellWidth;
    this.y = this.YY * this.player.game.cellHeight;
  }

  public setNewCoords() {
    this.XX = randomInt(0, this.player.game.cellCount - 1);
    this.YY = randomInt(0, this.player.game.cellCount - 1);
  }
};
