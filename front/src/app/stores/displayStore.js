import { makeAutoObservable } from 'mobx';
export default class DisplayStore {
	darkMode = false;
	paletteType = 'light';

	constructor() {
		console.log('%c *** AAA constructor DisplayStore ***', 'color:red');
		makeAutoObservable(this);
	}

	handleThemeChange = () => {
		this.darkMode = !this.darkMode;
		this.paletteType = this.darkMode ? 'dark' : 'light';
	};
}
