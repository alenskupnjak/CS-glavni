import { makeAutoObservable, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { find } from 'lodash-es';
import { store } from './store';

export default class ProductStore {
	listaProdukata = null;
	loading = false;
	loadingAdd = false;
	product = null;
	productName = null;
	basket = null;
	quantity = 0;
	item = 0;
	itemCount = 0;
	// editMode = false;
	// loadingInitial = false;
	// pagingParams = { pageNumber: 1, pageSize: 3 };
	// predicate = { startDate: new Date() };

	constructor() {
		console.log('%c *** A constructor ProductStore ***', 'color:red');
		makeAutoObservable(this);

		reaction(
			() => this.basket,
			() => {
				console.log('%c ****** BOOM ******************', 'color:red');
				// this.pagingParams = { pageNumber: 1, pageSize: 3 };
			}
		);

		//Inicijalno startamo usnimavanje
		this.loadAllProduct();
	}

	//  Usnimavanje svih dogadaja, ne iz memorije kako je autor radio
	loadAllProduct = async () => {
		try {
			// this.loadingInitial = true;
			this.listaProdukata = null;
			this.loading = true;
			// const response = await agent.Servisi.listSvih(this.axiosParams);
			const response = await agent.Catalog.list();
			const responseBasket = await agent.Basket.get();
			// useEffect(() => {
			// 	agent.Catalog.list()
			// 		.then(res => setProducts(res.data))
			// 		.finally(() => setLoading(false));
			// }, []);

			runInAction(() => {
				this.listaProdukata = response.data;
				this.basket = responseBasket.data;
				this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				// this.pagingParams.currentPage = response.currentPage;
				// this.pagingParams.itemsPerPage = response.itemsPerPage;
				// this.pagingParams.totalItems = response.totalItems;
				// this.pagingParams.totalPages = response.totalPages;
				// this.activities = _.sortBy(response.data, ['date']);
				// this.activities = _.chain(this.activities)
				// Group the elements of Array based on `date` property
				// .groupBy('date')
				// // `key` is group's name (date), `value` is the array of objects
				// .map((value, key) => ({ date: key, podaci: value }))
				// .value();

				// const user = store.userStore.user;
				// this.activities.forEach(data => {
				// 	if (user) {
				// 		data.podaci[0].isGoing = data.podaci[0]?.attendees.some(a => a.username === user.username);
				// 		data.podaci[0].isHost = data.podaci[0]?.hostUsername === user.username;
				// 		data.podaci[0].host = data.podaci[0]?.attendees?.find(x => x.username === data.podaci[0].hostUsername);
				// 		data.domacin = data.podaci[0]?.attendees?.find(x => x.username === data.podaci[0].hostUsername);
				// 	}
				// 	return data;
				// });
			});
		} catch (err) {
			console.log('%c Greška u ProductStore ', 'color:red', err);
			runInAction(() => {});
		} finally {
			// await new Promise(r => setTimeout(r, 2000));
			this.loading = false;
			// this.loadingInitial = false;
		}
	};

	loadOneItem = async (productId, history) => {
		try {
			this.loadingAdd = true;
			const response = await agent.Catalog.details(productId);
			const responseBasket = await agent.Basket.get();

			runInAction(() => {
				this.product = response.data;
				this.basket = responseBasket.data;
				this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				this.quantity = 0;
				this.item = find(this.basket.items, i => i.productId === this.product.id);
				console.log('%c 100  this.item', 'color:gold', this?.item);
				history.push(`/catalog/:${productId}`);
			});
		} catch (error) {
			console.log('%c 00', 'color:red', error);
		} finally {
			this.loadingAdd = false;
		}
	};

	// ADD ADD ADD ADD ADD ADD
	handleAddItem = async (productId, name) => {
		try {
			this.loading = true;
			this.productName = name;
			await agent.Basket.addItem(productId);
			const responseBasket = await agent.Basket.get();
			this.basket = responseBasket.data;
			this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
		} catch (err) {
			console.log('%c err', 'color:red', err);
		} finally {
			this.loading = false;
		}
	};

	// DELETE DELETE DELETE DELETE DELETE DELETE
	handleRemoveItem = async (productId, quantity = 1, name) => {
		try {
			this.loading = true;
			this.productName = name;
			await agent.Basket.removeItem(productId, quantity);
			const response = await agent.Basket.get();
			runInAction(async () => {
				this.basket = response.data;
				this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
			});
		} catch (error) {
			console.log(error);
		} finally {
			this.loading = false;
		}
	};

	handleInputChange = event => {
		if (event.target.value >= 0) {
			this.quantity = parseInt(event.target.value);
		}
	};

	// UPDATE chart
	handleUpdateCart = async (productId, quantity) => {
		try {
			this.loading = true;
			this.item = this.basket.items.find(i => i.productId === this.product.id);
			if (!this.item || quantity > this.item.quantity) {
				const updatedQuantity = this.item ? quantity - this.item.quantity : quantity;
				await agent.Basket.addItem(this.product.id, updatedQuantity);
			} else {
				const updatedQuantity = this.item.quantity - quantity;
				console.log('%c BRISI updatedQuantity=', 'color:red', updatedQuantity);
				await agent.Basket.removeItem(this.product.id, updatedQuantity);
			}
			const recordBasket = await agent.Basket.get();
			runInAction(async () => {
				this.basket = recordBasket.data;
				this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
			});
		} catch (error) {
			console.log('%c error', 'color:red', error);
		} finally {
			this.loading = false;
		}
	};

	// function handleUpdateCart() {
	// console.log('%c 00 item ', 'color:red', item);
	// setSubmitting(true);
	// if (!item || quantity > item.quantity) {
	// 	const updatedQuantity = item ? quantity - item.quantity : quantity;
	// 	agent.Basket.addItem(product?.id, updatedQuantity)
	// 		.then(basket => setBasket(basket))
	// 		.catch(error => console.log(error))
	// 		.finally(() => setSubmitting(false));
	// } else {
	// 	const updatedQuantity = item.quantity - quantity;
	// 	agent.Basket.removeItem(product?.id, updatedQuantity)
	// 		.then(() => removeItem(product?.id, updatedQuantity))
	// 		.catch(error => console.log(error))
	// 		.finally(() => setSubmitting(false));
	// }
	// }

	// function handleAddItem(productId, name) {
	// setStatus({ loading: true, name });
	// agent.Basket.addItem(productId)
	// 	.then(basket => {
	// 		return setBasket(basket);
	// 	})
	// 	.catch(error => console.log(error))
	// 	.finally(() => setStatus({ loading: false, name: '' }));
	// }

	// setPagingParams = pagingParams => {
	// 	this.pagingParams = pagingParams;
	// };

	// setPredicate = (predicate, value) => {
	// 	const resetPredicate = () => {
	// 		Object.entries(this.predicate).forEach(([key, val]) => {
	// 			console.log('%c 17', 'color:gold', value, key);
	// 			if (key !== 'startDate') delete this.predicate[key];
	// 		});
	// 	};

	// 	switch (predicate) {
	// 		case 'all':
	// 			resetPredicate();
	// 			this.predicate = { ...this.predicate, all: true };
	// 			break;
	// 		case 'isGoing':
	// 			resetPredicate();
	// 			this.predicate = { ...this.predicate, isGoing: true };
	// 			break;
	// 		case 'isHost':
	// 			resetPredicate();
	// 			this.predicate = { ...this.predicate, isHost: true };
	// 			break;
	// 		case 'startDate':
	// 			delete this.predicate['startDate'];
	// 			this.predicate = { ...this.predicate, startDate: value };
	// 			break;
	// 		default:
	// 		// nista
	// 	}
	// };

	// handleSubmitFormik = (values, history) => {
	// 	console.log('%c 043 CREATE createActivity activity ', 'background: #8d6e63; color: #242333', values);
	// 	if (values.id) {
	// 		this.updateActivity(values);
	// 		history.push(`/aktivni/${values.id}`);
	// 	} else {
	// 		this.createActivity(values);
	// 		history.push(`/aktivni`);
	// 	}
	// };

	// get axiosParams() {
	// 	const params = new URLSearchParams();
	// 	params.append('pageNumber', this.pagingParams.pageNumber.toString());
	// 	params.append('pageSize', this.pagingParams.pageSize.toString());
	// 	Object.entries(this.predicate).forEach(([key, val]) => {
	// 		if (key === 'startDate') {
	// 			params.append(key, val.toISOString());
	// 		} else {
	// 			params.append(key, val);
	// 		}
	// 	});
	// 	return params;
	// }

	//
	// Usnimavanje jednog itema
	// loadActivity = async id => {
	// 	try {
	// 		this.selektiran = null;
	// 		this.loadingInitial = true;
	// 		let activity = await agent.Servisi.listaJednog(id);
	// 		activity = activity.data;
	// 		runInAction(() => {
	// 			// Povlacim logiranog usera
	// 			const user = store.userStore.user;
	// 			if (user) {
	// 				activity.isGoing = activity.attendees.some(a => a.username === user.username);
	// 				activity.isHost = activity.hostUsername === user.username;
	// 				activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
	// 			}
	// 			// activity.date = new Date(activity.date);
	// 			this.selektiran = activity;
	// 			console.log('%c 034 loadActivity usnimljen 1 item', 'color:green', this.selektiran);
	// 		});
	// 	} catch (err) {
	// 		console.log('%c error ', 'color:red', err);
	// 	} finally {
	// 		this.loadingInitial = false;
	// 	}
	// };

	// CREATE CREATE CREATE CREATE CREATE
	// createActivity = async aktivnost => {
	// 	console.log('%c 038 CREATE createActivity activity ', 'background: #8d6e63; color: #242333', aktivnost);
	// 	try {
	// 		aktivnost.id = uuid();
	// 		this.loading = true;
	// 		await agent.Servisi.kreiraj(aktivnost);
	// 		runInAction(() => {
	// 			this.loadAllProduct();
	// 			this.selektiran = null;
	// 			this.loading = false;
	// 			this.editMode = false;
	// 		});
	// 	} catch (err) {
	// 		this.loading = false;
	// 		console.log('%c err Create  ', 'color:red', err);
	// 	}
	// };

	// updateActivity = async aktivnost => {
	// 	console.log('%c 039 UPDATE createActivity activity ', 'background: #8d6e63; color: #242333', aktivnost);
	// 	delete aktivnost.attendees;

	// 	this.loading = true;
	// 	try {
	// 		await agent.Servisi.update(aktivnost);
	// 		runInAction(() => {
	// 			this.activities = _.filter(this.activities, data => {
	// 				return data.id !== aktivnost.id;
	// 			});
	// 			this.activities.push(aktivnost);
	// 			this.activities = _.sortBy(this.activities, ['date']);
	// 			this.selektiran = aktivnost;
	// 			this.loading = false;
	// 			this.editMode = false;
	// 		});
	// 	} catch (err) {
	// 		this.loading = false;
	// 		console.log('%c err ', 'color:red', err);
	// 	}
	// };

	// DELETE DELETE DELETE DELETE
	// deleteActivity = async id => {
	// 	console.log('%c 041 DELETE  ', 'background: #8d6e63; color: #242333', id);
	// 	this.loading = true;
	// 	try {
	// 		await agent.Servisi.obrisi(id);
	// 		runInAction(() => {
	// 			this.loadAllProduct();
	// 			// this.cancelSelectedActivity();
	// 			this.loading = false;
	// 			this.editMode = false;
	// 		});
	// 	} catch (err) {
	// 		console.log('%c err ', 'color:red', err);
	// 	}
	// };

	// Iskljucuje/iskljucije prisutnost dogaraju
	// updateAttendance = async () => {
	// 	console.log('%c 040 UPDATE updateAttendance ', 'background: #8d6e63; color: #242333', this.selektiran);
	// 	const user = store.userStore.user;
	// 	this.loading = true;
	// 	try {
	// 		await agent.Servisi.attend(this.selektiran.id);
	// 		runInAction(() => {
	// 			if (this.selektiran?.isGoing) {
	// 				this.selektiran.attendees = this.selektiran.attendees?.filter(a => a.username !== user?.username);
	// 				this.selektiran.isGoing = false;
	// 			} else {
	// 				this.selektiran?.attendees.push(user);
	// 				this.selektiran.isGoing = true;
	// 			}
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		runInAction(() => (this.loading = false));
	// 	}
	// };

	// cancelActivityToggle = async () => {
	// 	console.log('%c 045 CANCEL updateAttendance ', 'background: #8d6e63; color: #242333', this.selektiran);
	// 	this.loading = true;
	// 	try {
	// 		await agent.Servisi.attend(this.selektiran.id);
	// 		runInAction(() => {
	// 			this.selektiran.isCancelled = !this.selektiran.isCancelled;
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		runInAction(() => (this.loading = false));
	// 	}
	// };

	// clearSelectedActivity = () => {
	// 	this.selektiran = null;
	// };
}