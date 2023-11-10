import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reduxSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})