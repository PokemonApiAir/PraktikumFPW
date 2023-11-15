import {configureStore} from "@reduxjs/toolkit"
import wishlistSlice from "./wishlistSlice"
import historySlice from "./historySlice"
import routeSlice from "./routeSlice"
import cartSlice from "./cartSlice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        wishlist: wishlistSlice,
        route: routeSlice,
        cart: cartSlice,
        history: historySlice
    },
})

export default store