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
const Team = React.lazy(() => import('./scenes/team/Team'));
const NotFound = React.lazy(() => import('./app/errors/NotFound'));
const Dashboard = React.lazy(() => import('./scenes/dashboard/Dashboard'));
const Form = React.lazy(() => import('./scenes/form/Form'));

{
	/* <Route path="/contacts" element={<Contacts />} />
<Route path="/invoices" element={<Invoices />} />
<Route path="/form" element={<Form />} />
<Route path="/bar" element={<Bar />} />
<Route path="/pie" element={<Pie />} />
<Route path="/line" element={<Line />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/calendar" element={<Calendar />} />
<Route path="/geography" element={<Geography />} /> */
}

const routes = [
	{
		enabled: true,
		path: '/dashboard',
		component: Dashboard,
		child: null,
		privateRoute: true,
	},
	{
		enabled: true,
		path: '/catalog',
		component: Catalog,
		child: null,
		exact: true,
		privateRoute: true,
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
	{
		enabled: true,
		path: '/team',
		component: Team,
		child: null,
		exact: false,
		privateRoute: true,
	},
	{
		enabled: true,
		path: '/',
		component: HomePage,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/form',
		component: Form,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '*',
		component: NotFound,
		child: null,
		exact: false,
		privateRoute: false,
	},
];

export default routes.filter(route => route.enabled);
