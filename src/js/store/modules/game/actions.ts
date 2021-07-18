import * as types from './types';

export const updateScore = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.UPDATE_SCORE,
      payload: data,
    })
  }
}