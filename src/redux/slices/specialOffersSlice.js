import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Create the slice
const specialOfferSlice = createSlice({
    name: "specialoffer",
    initialState: {
        base: [],         
        addedItems: [],
        baseQty: 0,
        addedQty: 0,
    },
    reducers: {
        addToSpecialCart: (state, action) => {

            const { item, type, toppings } = action.payload;
            const itemWithToppings = { item, toppings }; // Include toppings with the item

            console.log(itemWithToppings)
        },
        deleteFromSpecialCart: (state, action) => {
            const { itemId, type } = action.payload;
            if (type === 'base') {
                state.base = state.base.filter(item => item._id !== itemId);
            } else if (type === 'added') {
                state.addedItems = state.addedItems.filter(item => item._id !== itemId);
            }
        },
        checkQty: (state, action) => {
            const { type } = action.payload;
            if (type === 'base') {
                return state?.base?.length < state.baseQty;
            } else if (type === 'added') {
                return state.addedItems.length < state.addedQty;
            }
        },
        setQuantities: (state, action) => {
            const { baseQty, addedQty } = action.payload;
            state.baseQty = baseQty;
            state.addedQty = addedQty;
        }
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
export const { addToSpecialCart, deleteFromSpecialCart, checkQty, setQuantities } = specialOfferSlice.actions;
export default persistedReducer;
