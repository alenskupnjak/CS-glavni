import { makeAutoObservable, runInAction, reaction } from 'mobx';
import agent from '../../app/api/agent';
// import { v4 as uuid } from 'uuid';
import { find, debounce, isEmpty } from 'lodash-es';
import { store } from './store';
import { getCookie } from '../../app/util/util';

export default class ProductStore {
	listaProdukata = null;
	loading = false;
	loadingAdd = false;
	product = null;
	productName = null;
	basket = { buyerId: null, id: null, items: [], clientSecret: null, paymentIntentId: null };
	quantity = 0;
	item = 0;
	itemCount = 0;
	productParams = {
		orderBy: 'priceDesc',
		brands: 'Angular,NetCore',
		types: 'Boots,Boards,Hats,Gloves',
		searchTerm: '',
		pageSize: 4,
		pageNumber: 1,
	};
	metaData = {};
	newCheckedBrands = ['Angular', 'NetCore'];
	newCheckedTypes = ['Boots', 'Boards', 'Hats', 'Gloves'];
	targetProduct = null;

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.basket,
			basket => {
				console.log('%c ****** BOOM BASKET ******************', 'color:red', basket);
				// this.pagingParams = { pageNumber: 1, pageSize: 3 };

				window.localStorage.setItem('Pokus', 'Provjera');
			}
		);
		this.filtersFind = debounce(this.fildFilteredItems, 100);

		//Init application
		console.log('%c START ***** START   ******** START  ', 'color:green');
		this.loadAllProduct();
	}

	//  Usnimavanje svih dogadaja
	loadAllProduct = async () => {
		try {
			// this.loadingInitial = true;
			this.listaProdukata = null;
			this.loading = true;
			const responseFilters = await agent.Catalog.filters();
			const response = await agent.Catalog.list(this.productParams);
			const params = JSON.parse(response.headers.pagination);

			runInAction(() => {
				this.metaData = {
					currentPage: params.currentPage,
					totalPages: params.totalPages,
					pageSize: params.pageSize,
					totalCount: params.totalCount,
				};
				this.filters = responseFilters.data;
				this.listaProdukata = response.data;
				// this.basket = responseBasket.data;
				// this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
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

	// LOAD ONE  ***  LOAD ONE  **  LOAD ONE **  LOAD ONE
	loadOneItem = async (productId, navigate) => {
		try {
			this.loadingAdd = true;
			const response = await agent.Catalog.details(productId);
			console.log('%c response =', 'color:green', response);

			const cookie = getCookie('buyerId');
			if (cookie) {
				const responseBasket = await agent.Basket.get();
				this.basket = responseBasket.data;
				this.item = find(this.basket.items, i => i.productId === this.product.id);
				this.quantity = 0;
			}
			runInAction(() => {
				this.product = response.data;
				this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				navigate(`/catalog/:${productId}`);
			});
		} catch (err) {
			console.log('%c error', 'color:red', err);
		} finally {
			this.loadingAdd = false;
		}
	};

	// ADD item ADD item ADD item ADD item
	handleAddItem = async (product, name) => {
		console.log('%c product', 'color:green', product);
		console.log('%c name=', 'color:green', name);
		console.log('%c user=', 'color:green', isEmpty(store.userStore.user.email));
		// console.log('%c this.user', 'color:green', store.userStore?.user);

		try {
			this.loading = true;
			this.productName = name;
			if (store.userStore?.user) {
				console.log('%c -------------------', 'color:green');

				await agent.Basket.addItem(product.productId || product.id);
				const responseBasket = await agent.Basket.get();
				this.basket = responseBasket.data;
			} else {
				const data = find(this.basket?.items, item => item.id === product.id);
				if (data) {
					this.basket.items.forEach(data => {
						if (data.id === product.id) {
							data.quantity++;
						}
					});
				} else {
					this.basket.items.push({ ...product, quantity: 1, productId: product.id });
				}
			}
			this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
			console.log('%c this.itemCount', 'color:green', this.itemCount);
		} catch (err) {
			console.log('%c err', 'color:red', err);
		} finally {
			this.loading = false;
		}
	};

	// DELETE DELETE DELETE DELETE DELETE DELETE
	handleRemoveItem = async (product, quantity = 1, name) => {
		try {
			this.loading = true;
			this.productName = name;
			if (store.userStore?.user) {
				await agent.Basket.removeItem(product.productId || product.id, quantity);
				const response = await agent.Basket.get();
				runInAction(async () => {
					this.basket = response.data;
					this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				});
			} else {
				const productBasket = find(this.basket?.items, item => item.id === product.id);

				if (productBasket.quantity > 1) {
					productBasket.quantity--;
					this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				} else {
					this.basket.items.forEach((item, idx) => {
						if (item.id === product.id) {
							this.basket.items.splice(idx, 1);
						}
					});
					if (isEmpty(this.basket.items)) {
						this.clearBasket();
					}
					this.itemCount = this.basket?.items.reduce((sum, item) => sum + item.quantity, 0);
				}
			}
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

	// FILTER FILTER FILTER
	handleFilterChange = searchTerm => {
		this.filtersFind.cancel();
		this.productParams = {
			...this.productParams,
			searchTerm,
			pageNumber: 1,
		};
		this.filtersFind(this.productParams);
	};

	// BRANDS BRANDS BRANDS BRANDS
	handleBrands = ({ brands }) => {
		this.filtersFind.cancel();
		const tempArray = this.productParams.brands.split(',');
		const currentIndex = find(tempArray, item => item === brands);
		const index = this.newCheckedBrands.indexOf(brands);
		if (currentIndex === -1 || isEmpty(currentIndex)) {
			this.newCheckedBrands.push(brands);
		} else {
			this.newCheckedBrands.splice(index, 1);
		}
		this.productParams.brands = this.newCheckedBrands.join(',');
		this.productParams = {
			...this.productParams,
			pageNumber: 1,
		};
		this.filtersFind(this.productParams);
	};

	// TYPES TYPES TYPES TYPES
	handleTypes = ({ types }) => {
		this.filtersFind.cancel();
		const tempArray = this.productParams.types.split(',');
		const currentIndex = find(tempArray, item => item === types);
		const index = this.newCheckedTypes.indexOf(types);
		if (currentIndex === -1 || isEmpty(currentIndex)) {
			this.newCheckedTypes.push(types);
		} else {
			this.newCheckedTypes.splice(index, 1);
		}
		this.productParams.types = this.newCheckedTypes.join(',');
		this.productParams = {
			...this.productParams,
			pageNumber: 1,
		};
		this.filtersFind(this.productParams);
	};

	handleRadioButton = ({ orderBy }) => {
		this.filtersFind.cancel();
		this.productParams = {
			...this.productParams,
			orderBy,
		};
		this.filtersFind(this.productParams);
	};

	// UPDATE chart
	handleUpdateCart = async (productId, quantity) => {
		try {
			console.log('%c 14', 'color:green', productId, quantity);

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

	fildFilteredItems = async filter => {
		try {
			this.loading = true;
			const response = await agent.Catalog.list(filter);
			const params = JSON.parse(response.headers.pagination);
			runInAction(() => {
				this.listaProdukata = response.data;
				this.metaData = {
					...this.metaData,
					currentPage: params.currentPage,
					totalPages: params.totalPages,
					pageSize: params.pageSize,
					totalCount: params.totalCount,
				};
			});
		} catch (error) {
			console.log('%c error', 'color:red', error);
		} finally {
			this.loading = false;
		}
	};

	//  promjena vrijednosti tabeli, pagiancija
	handlePaging = async (pageNumber, page) => {
		try {
			this.productParams = {
				...this.productParams,
				pageNumber,
			};
			this.filtersFind(this.productParams);
		} catch (error) {
			console.log('%c error', 'color:red', error);
		}
	};

	// Izprazni kosaricu
	clearBasket = () => {
		this.basket = { buyerId: null, id: null, items: [], clientSecret: null, paymentIntentId: null };
		this.itemCount = 0;
	};

	setBasket = basket => {
		this.basket = basket;
	};

	setListaProdukata = () => {
		return (this.listaProdukata = null);
	};

	// prelazak na placanje
	checkout = async navigate => {
		try {
			this.loading = true;
			const response = await agent.Payments.createPaymentIntent();
			console.log('%c 120 response', 'color:gold', response);
			this.basket = { ...this.basket, clientSecret: response.clientSecret, paymentIntentId: response.paymentIntentId };
			console.log('%c 121 BASKET', 'color:gold', this.basket);
			navigate(`/checkout`);
		} catch (error) {
			console.log('%c error', 'color:red', error);
		} finally {
			this.loading = false;
		}
	};

	handleDeleteProduct = async id => {
		try {
			this.loading = true;
			this.targetProduct = id;
			await agent.Admin.deleteProduct(id);
			this.loadAllProduct();
		} catch (error) {
			console.log('%c error', 'color:red', error);
		} finally {
			this.loading = false;
		}
	};

	goTo = (page, navigate) => {
		if (page === 'Inventory') {
			this.listaProdukata = null;
			this.productParams = {
				...this.productParams,
				orderBy: '',
				brands: '',
				types: '',
				searchTerm: '',
				pageSize: 4,
				pageNumber: 1,
			};
			console.log('%c 11 this.productParams', 'color:orange', this.productParams);
			this.filtersFind(this.productParams);
			navigate(`/inventory`);
		}
	};
}
