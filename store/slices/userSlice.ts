import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export interface IUserState {
  user: any;
}

export const initUser = {
  user: undefined,
};

export const initialState: IUserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserState, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
