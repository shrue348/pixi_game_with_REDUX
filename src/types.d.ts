interface Set<T> {
  add(value: T): Set<T>;
  clear(): void;
  delete(value: T): boolean;
  entries(): Array<[T, T]>;
  forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
  has(value: T): boolean;
  keys(): Array<T>;
  size: number;
}
interface SetConstructor {
  new <T>(): Set<T>;
  new <T>(iterable: Array<T>): Set<T>;
  prototype: Set<any>;
}
declare var Set: SetConstructor;

declare module PIXI {
	export interface Container {
        getChildByPath<T extends PIXI.DisplayObject>(query: string): T | undefined;
        addGlobalChild(...child: PIXI.DisplayObject[]): PIXI.DisplayObject[]; 
	}
}

declare module PIXI {
	export interface DisplayObject {
		replaceWithTransform(from:DisplayObject): void
	}
}

declare module PIXI {
	export interface Loader {
		filter(func: (v: PIXI.LoaderResource) => boolean): PIXI.LoaderResource[];
		loadAsync() : Promise<PIXI.IResourceDictionary>;
	}

}

declare module PIXI.utils {
	export interface EventEmitter {
		onceAsynce(event: string): Promise<any>;
	}
}

interface Window {
  __STORE__: IInitialState;
}

interface IGameState {
  score: number;
  level: number;
} 

interface IInitialState {
  game: IGameState,
}

interface IGameLevel {
  count: number,
  gameSpeed: number,
  scoresNeed: number,
  countBricks: number,
  countCell: number,
}
