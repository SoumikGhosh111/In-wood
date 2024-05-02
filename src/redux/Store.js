import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import cartSlice from "./slices/cartSlice";
import cartShow from "./slices/cartShow";
import userDataSlice from "./slices/userDataSlice";


const Store = configureStore({ 
    reducer: { 
        cart: cartSlice,
        show: cartShow, 
        userdata: userDataSlice
    }
}); 

// creating a persistedStore
const persistor = persistStore(Store); 
export {Store, persistor}; 