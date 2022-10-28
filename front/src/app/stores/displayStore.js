import { makeAutoObservable } from 'mobx';
// import { createTheme } from '@mui/material';

export default class DisplayStore {
	darkMode = false;
	paletteType = 'light';
	// theme = null;
	// theme = createTheme({
	// 	palette: {
	// 		mode: this.paletteType,
	// 		background: {
	// 			default: this.paletteType === 'light' ? '#eaeaea' : '#93c47d',
	// 		},
	// 	},
	// });

	constructor() {
		console.log('%c *** AAA constructor DisplayStore ***', 'color:red');
		makeAutoObservable(this);
	}

	handleThemeChange = () => {
		this.darkMode = !this.darkMode;
		this.paletteType = this.darkMode ? 'dark' : 'light';
		// this.theme = createTheme({
		// 	palette: {
		// 		mode: this.paletteType,
		// 		background: {
		// 			default: this.paletteType === 'light' ? '#eaeaea' : '#93c47d',
		// 		},
		// 	},
		// });
	};
}
