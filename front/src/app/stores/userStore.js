import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { history } from '../..';
import { store } from './store';
import { isEmpty } from 'lodash-es';

export default class UserStore {
	user = null;
	constructor() {
		makeAutoObservable(this);
	}

	loginForm = async (formData, location) => {
		this.user = null;
		// console.log('%c 00 formData', 'color:green', formData);
		// console.log('%c 00 history', 'color:green', history);
		// console.log('%c 00 location', 'color:green', location);

		try {
			const user = await agent.Account.login(formData);
			let claims = JSON.parse(atob(user.token.split('.')[1]));
			let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
			this.user = user;
			this.user = { ...this.user, roles };
			console.log('%c LOGIN user', 'color:blue', this.user);
			localStorage.setItem('user', JSON.stringify(this.user));
			if (user.basket?.items.length > 0) {
				store.productStore.basket = user.basket;
				store.productStore.itemCount = user.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
			} else {
				if (!isEmpty(store.productStore.basket.items)) {
					store.productStore.basket.items.forEach(async item => {
						await agent.Basket.addItem(item.id, item.quantity);
					});
				}
			}
			history.push(location?.state?.from?.pathname || '/catalog');
		} catch (error) {
			console.log(error);
		} finally {
			// console.log('%c 00 provjera', 'color:red', provjera);
		}
	};

	// LOGOUT LOGOUT LOGOUT LOGOUT
	signOut = () => {
		this.user = null;
		localStorage.removeItem('user');
		store.productStore.basket = { buyerId: null, id: null, items: [] };
		store.productStore.itemCount = 0;
		history.push('/');
	};

	fetchCurrentUser = async () => {
		try {
			// this.user = null;
			const user = await agent.Account.currentUser();
			if (user.data) {
				localStorage.setItem('user', JSON.stringify(user.data));
				this.user = user.data;
				console.log('%c  User Data', 'color:green', user.data);

				// store.productStore.basket = user.data.basket;
				store.productStore.setBasket(user.data.basket);
				store.productStore.itemCount = user.data.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
			}
		} catch (error) {
			console.log('%c fetchCurrentUser error', 'color:red', error);
		}
	};
}
