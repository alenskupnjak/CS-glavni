import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';

import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import { useStore } from '../../app/stores/store';
import PrivateRoute from './PrivateRoute';
import Orders from '../../features/orders/Orders';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';

function App(props) {
	const { displayStore } = useStore();
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
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Container sx={{ mt: 4 }}>
						<Switch>
							<Route exact path="/catalog" component={Catalog} />
							<Route path="/catalog/:id" component={ProductDetails} />
							<Route path="/about" component={AboutPage} />
							<Route path="/contact" component={ContactPage} />
							<Route path="/server-error" component={ServerError} />
							<Route path="/basket" component={BasketPage} />
							<PrivateRoute path="/checkout" component={CheckoutWrapper} />
							<PrivateRoute path="/orders" component={Orders} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route component={NotFound} />
						</Switch>
					</Container>
				)}
			/>
		</ThemeProvider>
	);
}

export default observer(App);

// <Link to={{  pathname: "/register",  state: data_you_need_to_pass }}> Register</Link>
// https://www.folkstalk.com/2022/09/passing-data-in-react-router-historypush-with-code-examples-2.html
// import { useHistory } from "react-router-dom";

// const FirstPage = props => {
//     let history = useHistory();

//     const someEventHandler = event => {
//        history.push({
//            pathname: '/secondpage',
//            search: '?query=abc',
//            state: { detail: 'some_value' }
//        });
//     };

// };

// export default FirstPage;
