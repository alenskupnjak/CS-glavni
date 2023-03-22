import { configureStore } from '@reduxjs/toolkit';
import cartReducer from 'features/cart/cartSlice';

export const storeRedux = configureStore({
	reducer: {
		cart: cartReducer,
	},
});
