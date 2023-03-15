import React from 'react';

const Catalog = React.lazy(() => import('./features/catalog/Catalog'));
const ContactPage = React.lazy(() => import('./features/contact/ContactPage'));
const ProductDetails = React.lazy(() => import('./features/catalog/ProductDetails'));
const AboutPage = React.lazy(() => import('./features/about/AboutPage'));
const ServerError = React.lazy(() => import('@app/errors/ServerError'));
const BasketPage = React.lazy(() => import('./features/basket/BasketPage'));
const Login = React.lazy(() => import('./features/account/Login'));
const Register = React.lazy(() => import('./features/account/Register'));
const ImportFileOld = React.lazy(() => import('./features/importfile/ImportFileOld'));
const ChartZaba = React.lazy(() => import('./features/importfile/ChartZaba'));
const CheckoutWrapper = React.lazy(() => import('./features/checkout/CheckoutWrapper'));
const Orders = React.lazy(() => import('./features/orders/Orders'));
const Inventory = React.lazy(() => import('./features/admin/Inventory'));
const HomePage = React.lazy(() => import('./@app/home/HomePage'));
const Team = React.lazy(() => import('app/components/team/Team'));
const NotFound = React.lazy(() => import('@app/errors/NotFound'));
const Dashboard = React.lazy(() => import('app/components/dashboard/Dashboard'));
const Form = React.lazy(() => import('app/components/form/Form'));
const Contacts = React.lazy(() => import('./app/components/contacts/Contacts'));
const UnderConstruction = React.lazy(() => import('@app/errors/UnderConstruction'));
const Invoices = React.lazy(() => import('app/components/invoices/Invoices'));
const Calendar = React.lazy(() => import('app/components/calendar/Calendar'));
const FAQ = React.lazy(() => import('app/components/faq/FAQ'));
const Bar = React.lazy(() => import('app/components/bar/Bar'));
const Line = React.lazy(() => import('app/components/line/Line'));
const Pie = React.lazy(() => import('app/components/pie/Pie'));
const Geography = React.lazy(() => import('./app/components/geography/Geography'));
const Example1 = React.lazy(() => import('app/components/temp/Example1'));
const Example2 = React.lazy(() => import('app/components/temp/Example2'));
const Example3 = React.lazy(() => import('app/components/temp/Example3'));
const Example4 = React.lazy(() => import('app/components/temp/Example4'));
const ReactToastify = React.lazy(() => import('@app/common/ReactToastify'));
const SportsList = React.lazy(() => import('features/sports/SportsList'));
const LeagueTable = React.lazy(() => import('features/sports/LeagueTable'));

const routes = [
	{
		enabled: true,
		path: '/table-pl',
		component: LeagueTable,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/sports-list',
		component: SportsList,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/line',
		component: Line,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/pie',
		component: Pie,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/geography',
		component: Geography,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/bar',
		component: Bar,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/faq',
		component: FAQ,
		child: null,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/dashboard',
		component: Dashboard,
		child: null,
		privateRoute: false,
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
		path: '/import-file-old',
		component: ImportFileOld,
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
		path: '/contacts',
		component: Contacts,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/underConstruction',
		component: UnderConstruction,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/invoices',
		component: Invoices,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/calendar',
		component: Calendar,
		child: null,
		exact: false,
		privateRoute: false,
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
		path: '/example1',
		component: Example1,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/example2',
		component: Example2,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/example3',
		component: Example3,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/example4',
		component: Example4,
		child: null,
		exact: false,
		privateRoute: false,
	},
	{
		enabled: true,
		path: '/react-toastify',
		component: ReactToastify,
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
