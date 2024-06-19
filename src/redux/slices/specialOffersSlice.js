import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Create the slice
const specialOfferSlice = createSlice({
    name: "specialoffer", 
    initialState: {
        specialOrder:{}
    },
    reducers: {
        addSpecialObject: (state, action) => { 
            state.specialOrder = action.payload
        }, 
        deleteSpecialObject: (state, action) => { 
            state.specialOrder = {}; 
        }, 
        
    }
});

// Define the persist config
const persistConfig = {
    key: 'specialoffer',
    storage: storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, specialOfferSlice.reducer);

// Export actions and the persisted reducer
export const { addSpecialObject, deleteSpecialObject } = specialOfferSlice.actions;
export default persistedReducer;
