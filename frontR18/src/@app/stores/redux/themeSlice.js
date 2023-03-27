import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const themeSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openMenu: (state, action) => {
			state.isOpen = true;
		},
		closeMenu: (state, action) => {
			state.isOpen = false;
		},
	},
});

export const { openMenu, closeMenu } = themeSlice.actions;

export default themeSlice.reducer;
