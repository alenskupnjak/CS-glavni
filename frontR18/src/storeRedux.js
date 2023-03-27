import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@app/stores/redux/cart/cartSlice';
import modalReducer from '@app/stores/redux/modalSlice';
import themeReducer from '@app/stores/redux/themeSlice';

export const storeRedux = configureStore({
	reducer: {
		cart: cartReducer,
		modal: modalReducer,
		theme: themeReducer,
	},
});
