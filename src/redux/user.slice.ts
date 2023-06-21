import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/user.types';

export const initialState: IUser = {
  uid: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
      state.userName = `User ${action.payload}`;
      return state;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      return state;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
