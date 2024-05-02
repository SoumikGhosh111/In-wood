import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '', 
    name: '',
    email: '',
    city: '',
    state: '',
    country: '',
    street: ''
};

const userDataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
   setUserData: (state, action) => { 
    const { userId, name, email, city, stateLocation, country, street } = action.payload;
    return { 
        ...state, 
        userId: userId || '',
        name: name || '',
        email: email || '',
        city: city || '',
        stateLocation: stateLocation || '',
        country: country || '',
        street: street || ''
    }
   }
  },
});
export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;