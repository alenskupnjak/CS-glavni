import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5030/api/';

// const responseBody = response => response.data;

axios.interceptors.response.use(
	async response => {
		await sleep();
		console.log(response);
		return response;
	},
	error => {
		console.log('00*', error);
		console.log('01*', error.response);
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
	get: url => axios.get(url).then(response => response),
	post: (url, body) => axios.post(url, body).then(response => response.data),
	put: (url, body) => axios.put(url, body).then(response => response.data),
	delete: url => axios.delete(url).then(response => response.data),
};

const Catalog = {
	list: () => requests.get('products'),
	details: id => requests.get(`products/${id}`),
};

const TestErrors = {
	get400Error: () => requests.get('buggy/bad-request'),
	get401Error: () => requests.get('buggy/unauthorised'),
	get404Error: () => requests.get('buggy/not-found'),
	get500Error: () => requests.get('buggy/server-error'),
	getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
	Catalog,
	TestErrors,
};

export default agent;
