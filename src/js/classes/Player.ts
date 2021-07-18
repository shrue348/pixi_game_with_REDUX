import * as PIXI from 'pixi.js';
import Game from './Game';
import Tail from './Tail';

export default class Player extends PIXI.Container {
  
  
  private direction: string;
  public game: Game;
  public tail: PIXI.Container;
  public tailCoords: number[][];
  private nose: PIXI.Graphics;
  public XX: number;
  public YY: number;

  constructor(
    game: Game,
  ) {
    super();

    this.game = game;
    this.XX = 0;
    this.YY = 0;
    this.x = 0;
    this.y = 0;
    this.width = this.game.cellWidth;
    this.height = this.game.cellHeight;
    this.direction = '';
    this.visible = false;

    this.tailCoords = [];
    this.tail = new PIXI.Container();
    this.addChild(this.tail);

    this.nose = new PIXI.Graphics();
    this.nose.beginFill(0xffffff);
    this.nose.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    this.nose.endFill();
    this.addChild(this.nose);
  };

  public draw() {
    if (this.tail.children.length < 3) this.addTail();

    for (let i = this.tailCoords.length - 1; i >= 0; i--) {
      const tailCoordsItem = this.tailCoords[i];

      if (i - 1 >= 0) {
        tailCoordsItem[0] = this.tailCoords[i - 1][0];
        tailCoordsItem[1] = this.tailCoords[i - 1][1];
      } else {
        tailCoordsItem[0] = this.XX;
        tailCoordsItem[1] = this.YY;
      }
    }

    for (let i = this.tail.children.length - 1; i >= 0; i--) {
      const tailItem = this.tail.children[i];

      tailItem.x = this.tailCoords[i][0] * this.game.cellWidth;
      tailItem.y = this.tailCoords[i][1] * this.game.cellHeight;

      tailItem.visible = true;
    }

    if (this.direction === 'right') this.XX += 1;
    if (this.direction === 'left') this.XX -= 1;
    if (this.direction === 'up') this.YY -= 1;
    if (this.direction === 'down') this.YY += 1;

    if (this.XX > this.game.cellCount - 1) this.XX = 0;
    if (this.XX < 0) this.XX = this.game.cellCount - 1;
    if (this.YY > this.game.cellCount - 1) this.YY = 0;
    if (this.YY < 0) this.YY = this.game.cellCount - 1;

    this.nose.x = this.XX * this.game.cellWidth;
    this.nose.y = this.YY * this.game.cellHeight;
  }

  public setDirection(direction: string) {
    this.direction = direction;
  }

  public addTail() {
    this.tailCoords.push([this.XX, this.YY]);
    const tailItem = new Tail(this, this.XX, this.YY);
    this.tail.addChild(tailItem);
  }

  public gameOver() {
    this.visible = false;
    this.XX = 0;
    this.YY = 0;
    this.x = 0;
    this.y = 0;
    this.tailCoords.length = 0;
    this.setDirection('');
  }

  public startNewGame() {
    this.visible = true;
    this.XX = 0;
    this.YY = 0;
    this.tail.children.length = 0;
    this.setDirection('right');
  }
};
