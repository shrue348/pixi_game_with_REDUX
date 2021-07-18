import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";

import * as reducers from "./modules";

export default function configureStore( initialState?: IInitialState) {
  const rootReducer = combineReducers( reducers );
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
    ))
  );
  return store;
}