import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { history } from '../..';
import { store } from './store';

export default class UserStore {
	user = null;

	constructor() {
		console.log('%c *** AAA constructor DisplayStore ***', 'color:red');
		makeAutoObservable(this);
	}

	submitForm = async (formData, history, location) => {
		this.user = null;
		console.log('%c 00 formData', 'color:green', formData);
		console.log('%c 00 history', 'color:green', history);
		console.log('%c 00 location', 'color:green', location);

		try {
			const user = await agent.Account.login(formData);
			this.user = user;
			localStorage.setItem('user', JSON.stringify(user));
			console.log('%c 00 ', 'color:green', this.user);
			history.push(location.state?.from?.pathname || '/catalog');
		} catch (error) {
			console.log(error);
		} finally {
			const provjera = await agent.Account.currentUser();
			console.log('%c 00 provjera', 'color:red', provjera);
		}
	};

	signOut = () => {
		this.user = null;
		localStorage.removeItem('user');
		store.productStore.basket = null;
		store.productStore.itemCount = 0;
		history.push('/');
		console.log('%c 00 store.productStore.basket', 'color:green', store.productStore.basket);
	};
}
