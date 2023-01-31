import React from 'react';

const Catalog = React.lazy(() => import('./features/catalog/Catalog'));
const ContactPage = React.lazy(() => import('./features/contact/ContactPage'));
const ProductDetails = React.lazy(() => import('./features/catalog/ProductDetails'));
const AboutPage = React.lazy(() => import('./features/about/AboutPage'));
const ServerError = React.lazy(() => import('./app/errors/ServerError'));
const BasketPage = React.lazy(() => import('./features/basket/BasketPage'));
const Login = React.lazy(() => import('./features/account/Login'));
const Register = React.lazy(() => import('./features/account/Register'));
const ImportFile = React.lazy(() => import('./features/importfile/ImportFile'));
const ChartZaba = React.lazy(() => import('./features/importfile/ChartZaba'));
const CheckoutWrapper = React.lazy(() => import('./features/checkout/CheckoutWrapper'));
const Orders = React.lazy(() => import('./features/orders/Orders'));
const Inventory = React.lazy(() => import('./features/admin/Inventory'));
const HomePage = React.lazy(() => import('./features/home/HomePage'));

const routes = [
	{
		enabled: false,
		path: '/',
		component: HomePage,
		child: null,
		exact: true,
	},
	{
		enabled: true,
		path: '/catalog',
		component: Catalog,
		child: null,
		exact: true,
		navbar: 'Catalog',
	},
	{
		enabled: true,
		path: '/contact',
		component: ContactPage,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/catalog/:id',
		component: ProductDetails,
		child: null,
		exact: true,
	},
	{
		enabled: true,
		path: '/about',
		component: AboutPage,
		child: null,
		exact: true,
	},
	{
		enabled: true,
		path: '/server-error',
		component: ServerError,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/basket',
		component: BasketPage,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/login',
		component: Login,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/register',
		component: Register,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/import-file',
		component: ImportFile,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/chartZaba',
		component: ChartZaba,
		child: null,
		exact: false,
	},
	{
		enabled: true,
		path: '/checkout',
		component: CheckoutWrapper,
		child: null,
		exact: false,
		privateRoute: true,
	},
	{
		enabled: true,
		path: '/orders',
		component: Orders,
		child: null,
		exact: false,
		privateRoute: true,
	},
	{
		enabled: true,
		path: '/inventory',
		component: Inventory,
		child: null,
		exact: false,
		privateRoute: true,
		roles: ['Admin'],
	},
];

export default routes.filter(route => route.enabled);
