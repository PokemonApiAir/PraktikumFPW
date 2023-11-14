import {configureStore} from "@reduxjs/toolkit"
import wishlistSlice from "./wishlistSlice"
import routeSlice from "./routeSlice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        wishlist: wishlistSlice,
        route: routeSlice
    },
})

export default store