import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

// const sleep = () => new Promise(resolve => setTimeout(resolve, 200));

const sofaLoc = axios.create({
	baseURL: process.env.REACT_APP_SOFA,
});
sofaLoc.interceptors.request.use(config => {
	// console.log('%c -----config sofaLoc -----------', 'color:green', config);
	config.headers.Test = 'special get 001';

	return config;
});

const sofaAPI = axios.create({
	// baseURL: process.env.REACT_APP_SOFA,
});
sofaAPI.interceptors.request.use(config => {
	console.log('%c -----config-----------', 'color:pink', config);
	config.headers['X-RapidAPI-Key'] = '9f578f1b85msh7435be72f29f5dcp1c7dadjsn5324bbe2c60d';
	config.headers['X-RapidAPI-Host'] = 'sofascores.p.rapidapi.com';
	config.headers.Test = 'Porsao sam kroz API';

	return config;
});

// axios.defaults.baseURL = 'http://localhost:5030/api/';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

// TOKEN TOKEN TOKEN TOKEN
axios.interceptors.request.use(config => {
	// console.log('%c -----config-----------', 'color:green', config);

	config.headers.Test = 'special get headers';
	// config.headers.Config = config;

	const token = JSON.parse(localStorage.getItem('user'))?.token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// ERORS ERRORS ERRORS
axios.interceptors.response.use(
	async response => {
		// if (process.env.NODE_ENV === 'development') await sleep();
		// console.log('%c axios.interceptors', 'color:gold', response);
		return response;
	},
	error => {
		// console.log('%c 01 error', 'color:red', error);
		const { data, status, statusText } = error?.response || {};
		// console.log('%c 02 error?.response', 'color:red', error?.response);
		// console.log('%c 03 STATUS=', 'color:red', status);
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
				toast.error(data.title || statusText);
				break;
			case 403:
				toast.error('Nemate pristup ovoj operaciji!');
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
	get: (url, params) => axios.get(url, { params }).then(res => res),
	post: (url, body) => axios.post(url, body).then(response => response.data),
	put: (url, body) => axios.put(url, body).then(response => response.data),
	delete: url => axios.delete(url).then(response => response.data),
	deleteBody: (url, body) => axios.delete(url, body).then(response => response.data),
	postForm: (url, formData) =>
		axios
			.post(url, formData, {
				headers: { 'Content-type': 'multipart/form-data' },
			})
			.then(response => response.data),
	putForm: (url, formData) =>
		axios
			.put(url, formData, {
				headers: { 'Content-type': 'multipart/form-data' },
			})
			.then(response => response.data),
};

function createFormData(item) {
	console.log('%c 21 item', 'color:gold', item);

	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
	let formData = new FormData();
	for (const key in item) {
		console.log('%c 22', 'color:gold', key);

		formData.append(key, item[key]);
	}
	console.log('%c 23', 'color:red', formData.getAll('name'));
	console.log('%c 24', 'color:red', formData);
	return formData;
}

const Admin = {
	createProduct: item => requests.postForm('products', createFormData(item)),
	updateProduct: item => requests.putForm('products', createFormData(item)),
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

const SofaLoc = {
	getSeason: id => sofaLoc.get(`unique-tournament/${id}/seasons`).then(res => res),
	getTournament: (id, idSeason) =>
		sofaLoc.get(`unique-tournament/${id}/season/${idSeason}/standings/total`).then(res => res),
	getLastFive: (id, idSeason) =>
		sofaLoc.get(`unique-tournament/${id}/season/${idSeason}/team-events/total`).then(res => res),
	getHRConfig: sport => sofaLoc.get(`config/unique-tournaments/HR/${sport}`).then(res => res),
	getDayScheduleEventBySport: (sport, day) =>
		sofaLoc.get(`sport/${sport}/scheduled-events/${day}`).then(res => res.data),
	getDayScheduleEventOddsBySport: (sport, day) => sofaLoc.get(`sport/${sport}/odds/9/${day}`).then(res => res.data),
	getSportCategories: sport => sofaLoc.get(`sport/${sport}/categories`).then(res => res.data),
	getSportCategoriesDay: (sport, day) => sofaLoc.get(`sport/${sport}/${day}/3600/categories`).then(res => res.data),
};

const SofaAPI = {
	getApi: id => {
		const options = {
			method: 'GET',
			url: 'https://sofascores.p.rapidapi.com/v1/unique-tournaments/data',
			params: { unique_tournament_id: id },
			// headers: {
			// 	'X-RapidAPI-Key': '9f578f1b85msh7435be72f29f5dcp1c7dadjsn5324bbe2c60d',
			// 	'X-RapidAPI-Host': 'sofascores.p.rapidapi.com',
			// },
		};
		return sofaAPI.request(options).then(res => res);
	},
};

const ReadWriteDatabase = {
	ReadRecord: pageNumber => requests.post('uploadFile/readRecord', pageNumber),
	InsertCsvRecord: file => requests.post('uploadFile/UploadCSVFile', file),
	InsertExcelRecord: file => requests.post('uploadFile/UploadExcelFile', file),
	DeleteRecord: userId => requests.deleteBody('uploadFile/DeleteRecord', { data: { userID: userId } }),
	InsertZabaExcelRecord: file => requests.post('uploadFile/UploadZabaFile', file),
	ReadZaba: pageNumber => requests.post('uploadFile/ReadZaba', pageNumber),
	DeleteZabaRecord: ref => requests.deleteBody('uploadFile/DeleteZabaRecord', { data: { referencija: ref } }),
	updateZabaRecord: data => requests.post('uploadFile/UpdateZabaRecord', data),
};

const agent = {
	Catalog,
	TestErrors,
	Basket,
	Account,
	Orders,
	Payments,
	Admin,
	ReadWriteDatabase,
	SofaLoc,
	SofaAPI,
};

export default agent;
