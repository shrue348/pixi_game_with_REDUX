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

interface Window {
  __STORE__: IInitialState;
}

interface IGameState {
  score: number;
} 

interface IInitialState {
  game: IGameState,
}

interface IGameLevel {
  count: number,
  gameSpeed: number,
  scoresNeed: number,
  countBricks: number,
}
