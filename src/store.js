import { configureStore }  from '@reduxjs/toolkit';
import  cartSlice  from "./features/cart/cartSlice.js";
import modalSlice from './features/modal/modalSlice.js';
export const store = configureStore({
    reducer:{
        cart:cartSlice,
        modal:modalSlice
    },
})