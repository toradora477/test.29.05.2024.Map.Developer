import { combineReducers } from '@reduxjs/toolkit';
import markersReducer from './markersReducer';

const rootReducer = combineReducers({
  markers: markersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
