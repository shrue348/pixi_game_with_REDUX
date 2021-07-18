
import * as types from './types';
import { createReducer } from "../../utils";

const initialState: any[] = [];

const gameReducer = createReducer( initialState )( {
  [ types.UPDATE_SCORE ]: ( state: any, action: types.UpdateScoreAction) => {
    return [
      ...action.payload
    ];
  },
} );

export default gameReducer;
