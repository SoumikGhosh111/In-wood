import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import cartSlice from "./slices/cartSlice";


const Store = configureStore({ 
    reducer: { 
        cart: cartSlice
    }
}); 

// creating a persistedStore
const persistor = persistStore(Store)
export {Store, persistor}; 