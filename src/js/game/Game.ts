import * as PIXI from 'pixi.js';
import Engine from '../classes/Engine';
import { updateScore as updateStateScore } from '../store/modules/game/actions';
import Apple from '../classes/Apple';
import Brick from '../classes/Brick';
import Player from '../classes/Player';
import { levels } from './scenario';

export default class Game extends PIXI.Container {
  public engine: Engine;
  private view: PIXI.Container;
  private state: IInitialState;

  public player: Player;
  public apple: Apple;
  
  private currentLevel: number;
  private currentLevelSettings: IGameLevel;
  private gameSpeed: number;
  private time: number;
  public score: number;

  public cellCount: number;
  public cellWidth: number;
  public cellHeight: number;

  private mode: 'game' | 'gameover' | 'betweengame';

  constructor(
    engine: Engine,
  ) {
    super();

    this.engine = engine;
    this.engine.app.ticker.add(this.tick.bind(this));

    this.state = this.engine.store.getState();
    this.mode = 'gameover';

    this.x = 0;
    this.y = 0;

    this.score = this.state.game.score;
    this.currentLevel = this.state.game.level;
    this.currentLevelSettings = levels[this.currentLevel];


    this.view = new PIXI.Container();
    this.view.x = 0;
    this.view.y = this.engine.app.screen.width * .05 * 2;
    this.addChild(this.view);


    const background = new PIXI.Graphics();
    background.beginFill(0x0b3338);
    background.drawRect(0, 0, this.engine.app.screen.width, this.engine.app.screen.width);
    background.endFill();
    this.view.addChild(background);



    this.cellCount = 23;
    this.cellWidth = this.engine.app.screen.width / this.cellCount;
    this.cellHeight = this.engine.app.screen.width / this.cellCount;
    this.gameSpeed = 100;
    this.time = this.engine.time;

    this.apple = new Apple(this);
    this.player = new Player(this);

    this.view.addChild(this.apple);
    this.view.addChild(this.player);

    for (let i = 0; i < this.currentLevelSettings.countBricks; i++) {
      this.view.addChild(new Brick(this));
    }

  };

  private updateScore(score?: number) {
    if (score || score === 0) this.score = score;
    else this.score += 1;

    this.engine.store.dispatch(updateStateScore({
      ...this.engine.store.getState().game,
      score: this.score,
    }));

    if (this.score == this.currentLevelSettings.scoresNeed) {
      this.endLevel();
    }
  }

  public startNewGame () {
    this.mode = 'game';
    this.apple.visible = true;
    this.updateScore(0);
    this.player.startNewGame();
  }

  public gameOver() {
    this.mode = 'gameover';
    this.apple.visible = false;
    this.player.gameOver();
  }
  
  public endLevel() {
    this.gameOver();

    this.engine.store.dispatch(updateStateScore({
      ...this.engine.store.getState().game,
      level: this.currentLevel + 1,
    }));
    this.currentLevelSettings = levels[this.currentLevel];
  }

  tick (delta: number) {
    if (this.engine.controller.up) this.player.setDirection('up');
    if (this.engine.controller.down) this.player.setDirection('down');
    if (this.engine.controller.left) this.player.setDirection('left');
    if (this.engine.controller.right) this.player.setDirection('right');

    if (this.engine.time - this.time > (1 / 1000 * this.gameSpeed)) {
      this.time += (1 / 1000 * this.gameSpeed);

      if (this.mode === 'game') {
        this.player.draw();
        this.apple.draw();

        if (this.player.XX === this.apple.XX && this.player.YY === this.apple.YY) {
          this.updateScore();
          this.apple.setNewCoords();
          this.player.addTail();
        } else if (
          this.player.tailCoords.some((el) => (
            this.player.XX === el[0] && this.player.YY === el[1]
          ))
          && this.player.tailCoords.length >= 3
        ){
          // @ts-ignore
          this.engine.scenes.active.gameOver && this.engine.scenes.active.gameOver();
        }
      }


    }
  }
};
