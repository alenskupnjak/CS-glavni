import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { observer } from 'mobx-react';
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
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useStore } from '../../app/stores/store';

//

function App() {
	const { displayStore, productStore } = useStore();
	const { handleThemeChange, darkMode, paletteType } = displayStore;
	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === 'light' ? '#eaeaea' : '#93c47d',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/catalog" component={Catalog} productStore={productStore} />
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

export default observer(App);
