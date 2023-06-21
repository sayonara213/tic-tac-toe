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
      state.uid = action.payload.uid;
      state.userName = action.payload.userName;
      return state;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
      return state;
    },
  },
});

export default userSlice.reducer;

export const { setUser, updateUserName } = userSlice.actions;
