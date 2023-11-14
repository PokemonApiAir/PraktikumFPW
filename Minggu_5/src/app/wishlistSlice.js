import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    wishlist: []
}

export const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addWishlist : (state, action) => {
            state.wishlist.push(action.payload);
        }, removeWishlist : (state, action) => {
            const newData = state.wishlist.filter(id => id !== action.payload);
            state.wishlist = newData;
        }
    }
})

export const {addWishlist, removeWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer