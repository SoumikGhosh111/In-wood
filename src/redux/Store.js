import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import cartSlice from "./slices/cartSlice";
import cartShow from "./slices/cartShow";


const Store = configureStore({ 
    reducer: { 
        cart: cartSlice,
        show: cartShow
    }
}); 

// creating a persistedStore
const persistor = persistStore(Store)
export {Store, persistor}; 