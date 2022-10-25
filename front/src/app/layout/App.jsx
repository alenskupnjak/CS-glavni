import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import agent from '../api/agent';

import LoadingComponent from './LoadingComponent';

function App() {
	const { setBasket } = useStoreContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const buyerId = getCookie('buyerId');
		console.log('%c 00 BOOM ', 'color:red');
		if (buyerId) {
			agent.Basket.get()
				.then(basket => setBasket(basket.data))
				.catch(error => console.log(error))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [setBasket]);

	// UI interface
	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? 'dark' : 'light';
	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === 'light' ? '#eaeaea' : '#93c47d',
			},
		},
	});

	function handleThemeChange() {
		setDarkMode(!darkMode);
	}

	if (loading) return <LoadingComponent message="Pokrecem applikaciju..." />;

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/catalog" component={Catalog} />
					<Route path="/catalog/:id" component={ProductDetails} />
					<Route path="/about" component={AboutPage} />
					<Route path="/contact" component={ContactPage} />
					<Route path="/server-error" component={ServerError} />
					<Route path="/basket" component={BasketPage} />
					<Route path="/checkout" component={CheckoutPage} />
					<Route component={NotFound} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
