import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from './cartItems';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

// const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: cartItems,
	totalAmount: 0,
	total: 0,
	isLoading: true,
	name: null,
};

export const getCartItems = createAsyncThunk('cart/getCartItemsName', async (name, thunkAPI) => {
	try {
		const config = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'content-type',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Credentials': 'true',
				origin: 'http://localhost:5035',
			},
		};
		console.log(name);
		console.log(thunkAPI);
		console.log(thunkAPI.getState());
		// thunkAPI.dispatch(openModal());
		const resp = await axios.get(url);

		console.log('%c 00', 'color:gold', resp, config);

		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('something went wrong');
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: state => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter(item => item.id !== itemId);
		},
		increase: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotals: state => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach(item => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.totalAmount = amount;
			state.total = total;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getCartItems.pending, state => {
				console.log('%c 16', 'color:green', state);
				state.isLoading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				console.log('%c 17', 'color:green', state);
				state.isLoading = false;
				// state.cartItems = action.payload;
			})
			.addCase(getCartItems.rejected, (state, action) => {
				console.log('%c 18', 'color:blue', action);
				state.isLoading = false;
			});
	},
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
