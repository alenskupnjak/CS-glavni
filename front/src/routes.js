import React from 'react';

const Catalog = React.lazy(() => import('./features/catalog/Catalog'));
const ContactPage = React.lazy(() => import('./features/contact/ContactPage'));
const ProductDetails = React.lazy(() => import('./features/catalog/ProductDetails'));
const AboutPage = React.lazy(() => import('./features/about/AboutPage'));
const ServerError = React.lazy(() => import('./app/errors/ServerError'));
const BasketPage = React.lazy(() => import('./features/basket/BasketPage'));
const Login = React.lazy(() => import('./features/account/Login'));

// import Login from './features/account/Login';

const routes = [
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
];

export default routes.filter(route => route.enabled);
