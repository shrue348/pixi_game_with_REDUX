import * as PIXI from 'pixi.js';
import { Store } from 'redux';
import { SceneManager } from 'pixi-scenes';
import Player from './Player';
import MainMenuScene from '../scenes/MainMenuScene';
import GameScene from '../scenes/GameScene';
import CreditsScene from '../scenes/CreditsScene';
import Controller, { IController } from '../singletones/Controller'
import Keyboard from '../singletones/Keyboard'
import initialState from '../store/initialState';
import configureStore from '../store';

export default class Engine {
  private player: Player | null;
  private scenes: SceneManager;
  private log: HTMLElement;
  private keyboard: typeof Keyboard;
  private store: Store<any>;

  public app: PIXI.Application;
  public controller: IController;
  public time: number;

  shaderCode: string;
  filter: PIXI.Filter;

  constructor() {
    this.app = new PIXI.Application({
      width: 1080,
      height: 1645,
      backgroundColor: 0x37474f,
      antialias: true,
    });

    document.body.appendChild(this.app.view);
    
    this.log = document.querySelector('p');
    this.time = 0;

    this.store = configureStore(initialState);
    this.keyboard = Keyboard;
    this.controller = Controller;

    this.app.loader
      .add('button_small', '../images/button_small.png')
      .add('button_round', '../images/button_round.png')
      .add('button_click_small', '../images/button_click_small.png')
      .add('button_click_round', '../images/button_click_round.png')

      .add('bunny', '../sprites/bunny/bunny.json')

      .add('shader', '../shaders/first.frag');

    this.app.loader.load(this.afterLoad.bind(this));

  }

  addScenes(): void {
    this.scenes = new SceneManager(this.app);
    this.scenes.add('mainMenu', new MainMenuScene(this));
    this.scenes.add('credits', new CreditsScene());
    this.scenes.add('game', new GameScene(this));
    this.scenes.start('mainMenu');
  }

  afterLoad(): void {
    this.addScenes();
    // this.app.ticker.speed = 2;
    this.app.ticker.add(this.tick.bind(this));


    // shader
    this.shaderCode = this.app.loader.resources["shader"].data;
    const container = new PIXI.Container();
    container.filterArea = new PIXI.Rectangle(0, 0, this.app.screen.width, this.app.screen.height);
    this.app.stage.addChild(container);
    this.filter = new PIXI.Filter(null, this.shaderCode, {
      mouse: new PIXI.Point(),
      time: this.time,
    });
    container.filters = [this.filter];

  }


  tick(delta: number): void {
    this.time += delta / 60;

    // shader
    this.filter.uniforms.mouse.copyFrom(this.app.renderer.plugins.interaction.mouse.global);
    this.filter.uniforms.time = this.time;

    this.log.innerHTML = '';
    this.log.innerHTML += `
      ${this.controller.up ? 'up' : ''}
      ${this.controller.down ? 'down' : ''}
      ${this.controller.left ? 'left' : ''}
      ${this.controller.right ? 'right' : ''}
      ${this.controller.jump ? 'jump' : ''}
      ${this.controller.restart ? 'restart' : ''}
      ${this.controller.orientation ? `${this.controller.orientation.alpha}` : ''}
    `;
  }
};
