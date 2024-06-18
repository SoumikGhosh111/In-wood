import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import cartSlice from "./slices/cartSlice";
import cartShow from "./slices/cartShow";
import userDataSlice from "./slices/userDataSlice";
import specialOffersSlice from "./slices/specialOffersSlice"; 


const Store = configureStore({ 
    reducer: { 
        cart: cartSlice,
        show: cartShow, 
        userdata: userDataSlice, 
        specialoffer: specialOffersSlice,
    }
}); 

// creating a persistedStore
const persistor = persistStore(Store); 
export {Store, persistor}; 