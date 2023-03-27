import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	pallete: 'dark',
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
		changeTheme: (state, { payload }) => {
			state.pallete = payload;
		},
	},
});

export const { openMenu, closeMenu, changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
