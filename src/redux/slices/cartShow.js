import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTrue: false,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.isTrue = true;
    },
    setFalse: (state) => {
      state.isTrue = false;
    },
    toggle: (state) => {
      state.isTrue = !state.isTrue;
    },
  },
});

export const { setTrue, setFalse, toggle } = booleanSlice.actions;

export default booleanSlice.reducer;