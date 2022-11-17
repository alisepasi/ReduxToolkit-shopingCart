import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
const initialState = {
  cartItems: [],
  amount: 10,
  total: 0,
  isLoading: true,
};
 const url = 'https://course-api.com/react-useReducer-cart-project';
 export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers:{
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem:(state, action)=>{
        state.cartItems = state.cartItems.filter(e=> e.id !== action.payload)
    },
    increase:(state,{payload})=>{
        const inc =  state.cartItems.find(e=> e.id === payload.id);
        inc.amount = inc.amount +1;
    },
    decrease:(state,{payload})=>{
        const dec = state.cartItems.find(e=> e.id === payload.id);
        dec.amount = dec.amount -1;
    },
    calculateTotal:(state)=>{
        let amount =0;
        let total=0;
        state.cartItems.forEach((item)=>{
            amount+= item.amount;
            total+=item.amount * item.price;
        })
        state.amount = amount;
        state.total = total;
    }
  },
});
console.log(cartSlice);
export const { clearCart,removeItem ,increase,decrease,calculateTotal} = cartSlice.actions;
export default cartSlice.reducer;
