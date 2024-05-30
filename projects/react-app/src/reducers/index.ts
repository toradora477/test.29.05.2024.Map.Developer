import { combineReducers } from 'redux';
import markerReducer from './markerReducer';

const rootReducer = combineReducers({
  markers: markerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
