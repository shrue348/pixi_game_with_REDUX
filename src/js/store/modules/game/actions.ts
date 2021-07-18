import * as types from './types';

export const updateScore = (data: any) => ({
  type: types.UPDATE_SCORE,
  payload: data,
})
