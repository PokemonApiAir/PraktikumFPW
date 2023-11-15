import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCart : (state, action) => {
            state.cart.push(action.payload);
        }, removeCart : (state, action) => {
            const newData = state.cart.filter(id => id !== action.payload);
            state.cart = newData;
        }, clearCart : (state) => {
            state.cart = [];
        }
    }
})

export const {addCart, removeCart, clearCart} = cartSlice.actions

export default cartSlice.reducer