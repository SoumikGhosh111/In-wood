import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '', 
    zipCode: ''
};

const userDataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
   setUserData: (state, action) => { 
    const { userId,zipCode } = action.payload;
    return { 
        ...state, 
        userId: userId || null,
        zipCode:zipCode || null
    }
   }
  },
});
export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;