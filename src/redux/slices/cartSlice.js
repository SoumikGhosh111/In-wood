import { createSlice, createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [], 
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                state.cart = state.cart.map((item) => 
                    item.id === action.payload.id ? { ...item, qty: item.qty + 1}: item
                ); 
            }else{ 
                state.cart.push(action.payload); 
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item )=> item.id !== action.payload.id); 
        },

        addToppingsToOrder: (state, action) => { 
            state.cart = state.cart.map((item) => ( 
                item.id === action.payload.id ? {...item, toppings: action.payload.toppings} : item
            ))
        }, 
        updateOrder: (state, action) => {

        },
        incrementQty: (state, action) => {
            state.cart = state.cart.map((item) => 
                item.id === action.payload.id ? {...item, qty: item.qty + 1} : item
            ); 
        },
        decrementQty: (state, action) => {
            state.cart = state.cart.map((item ) => 
                item.id === action.payload.id ? {...item, qty: item.qty === 1 ? 1 : item.qty - 1} : item
            );
        }
    }
});


// creating a persisting reducer 
const presistConfig = { 
    key: 'cart', 
    storage: storage,
}


const persistedReducer = persistReducer(presistConfig, cartSlice.reducer)
// actions
export const { addToCart, removeFromCart, addToppingsToOrder, incrementQty, decrementQty } = cartSlice.actions;

// reducer
// export default cartSlice.reducer; 

// exporting the persistReducer
export default persistedReducer; 