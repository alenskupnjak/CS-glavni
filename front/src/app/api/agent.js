import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5030/api/';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
	config.headers.test = 'special get headers';
	return config;
});

axios.interceptors.response.use(
	async response => {
		await sleep();
		console.log('%c axios.interceptors', 'color:gold', response);
		return response;
	},
	error => {
		console.log('00*', error);
		const { data, status } = error.response;
		switch (status) {
			case 400:
				if (data.errors) {
					const modelStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				}
				toast.error(data.title);
				break;
			case 401:
				toast.error(data.title);
				break;
			case 404:
				toast.error(data.title);
				break;
			case 500:
				toast.error(data.title);
				history.push({
					pathname: '/server-error',
					state: { error: data },
				});
				break;
			default:
				break;
		}
		return Promise.reject(error.response);
	}
);

const requests = {
	get: (url, params) => axios.get(url, { params }).then(response => response),
	post: (url, body) => axios.post(url, body).then(response => response.data),
	put: (url, body) => axios.put(url, body).then(response => response.data),
	delete: url => axios.delete(url).then(response => response.data),
};

function createFormData(item) {
	let formData = new FormData();
	for (const key in item) {
		formData.append(key, item[key]);
	}
	return formData;
}

const Admin = {
	createProduct: product => requests.postForm('products', createFormData(product)),
	updateProduct: product => requests.putForm('products', createFormData(product)),
	deleteProduct: id => requests.delete(`products/${id}`),
};

// povlačenje svih podataka
const Catalog = {
	list: params => requests.get('products', params),
	details: id => requests.get(`products/${id}`),
	filters: () => requests.get('products/filters'),
};

const TestErrors = {
	get400Error: () => requests.get('buggy/bad-request'),
	get401Error: () => requests.get('buggy/unauthorised'),
	get404Error: () => requests.get('buggy/not-found'),
	get500Error: () => requests.get('buggy/server-error'),
	getValidationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
	get: () => requests.get('basket'),
	addItem: (productId, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
	removeItem: (productId, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
	login: values => requests.post('account/login', values),
	register: values => requests.post('account/register', values),
	currentUser: () => requests.get('account/currentUser'),
	fetchAddress: () => requests.get('account/savedAddress'),
};

const Orders = {
	list: () => requests.get('orders'),
	fetch: id => requests.get(`orders/${id}`),
	create: values => requests.post('orders', values),
};

const Payments = {
	createPaymentIntent: () => requests.post('payments', {}),
};

const agent = {
	Catalog,
	TestErrors,
	Basket,
	Account,
	Orders,
	Payments,
	Admin,
};

export default agent;
