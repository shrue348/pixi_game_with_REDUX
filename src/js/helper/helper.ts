/**
 * Возвращает рандомное число от min до max
 */
 export function randomInt (min: number, max: number): number {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.abs(Math.floor(rand));
  return rand;
}

/**
 * переводит градусы в радианы
 * @param num - угол поворота в градусах
 */
export function inRad (num: number): number {
  return num * Math.PI / 180;
}

/**
 * Возвращает now performance или Date
 */
export function timeStamp (): number {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

/**
 * Быстрое побитовое округление
 * по преданию округляет быстрее Math.round
 * только для положительных чисел
 */
export function fastFloor (num: number): number {
  // return ~~(.5 + num);
  // return (0.5 + num) << 0;
  return (0.5 + num) | 0;
}

/**
 * Эталоны
 */
/*
if(Math.random() < 1 - Math.pow(.993, gameTime)) // - условие для усложнения игры
this.x += (x - this.x - screenWidth * 0.5) * 0.05; // - easing движение экрана к координате
*/
