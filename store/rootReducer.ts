import { combineReducers } from '@reduxjs/toolkit';

import app from './slices/appSlice';
import user from './slices/userSlice';
import filter from './slices/filterSlice';
import address from './slices/addressSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app,
  user,
  filter,
  address,
});

export default rootReducer;
