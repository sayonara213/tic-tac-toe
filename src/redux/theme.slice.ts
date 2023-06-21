import { createSlice } from '@reduxjs/toolkit';

export const initialState: { isLight: boolean } = {
  isLight: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.isLight = !state.isLight;
      return state;
    },
  },
});

export default themeSlice.reducer;

export const { switchTheme } = themeSlice.actions;
