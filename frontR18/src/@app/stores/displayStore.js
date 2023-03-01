import { makeAutoObservable } from 'mobx';
export default class DisplayStore {
	darkMode = false;
	paletteType = 'light';

	constructor() {
		makeAutoObservable(this);
	}

	handleThemeChange = () => {
		this.darkMode = !this.darkMode;
		this.paletteType = this.darkMode ? 'dark' : 'light';
	};
}
