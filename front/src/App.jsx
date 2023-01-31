import { Suspense, useState } from 'react';
import { Container, CssBaseline, createTheme, ThemeProvider, Stack, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import AboutPage from './features/about/AboutPage';
// import Catalog from './features/catalog/Catalog';
// import ProductDetails from './features/catalog/ProductDetails';
// import ContactPage from './features/contact/ContactPage';
import HomePage from './features/home/HomePage';
import Header from './app/layout/Header';
// import ServerError from './app/errors/ServerError';
import NotFound from './app/errors/NotFound';
// import Register from './features/account/Register';
import { useStore } from './app/stores/store';
import PrivateRoute from './app/layout/PrivateRoute';
// import Orders from './features/orders/Orders';
// import CheckoutWrapper from './features/checkout/CheckoutWrapper';
// import Inventory from './features/admin/Inventory';
// import ImportFile from './features/importfile/ImportFile';
import Sidebar from './app/layout/Sidebar';
// import ChartZaba from './features/importfile/ChartZaba';
import { styled } from '@mui/material/styles';

import routes from './routes';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function App() {
	const [mode, setMode] = useState('light');
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
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Sidebar setMode={setMode} mode={mode} />
			</Stack>

			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Container sx={{ mt: 4 }}>
						<Suspense fallback={<div>Loading u APP...</div>}>
							<Switch>
								{routes.map(route => {
									if (route.privateRoute) {
										return (
											<PrivateRoute
												roles={route.roles}
												path={route.path}
												component={route.component}
												key={route.path}
											/>
										);
									} else {
										return <Route path={route.path} component={route.component} key={route.path} exact={route.exact} />;
									}
								})}
								{/* <Route exact path="/catalog" component={Catalog} /> */}
								{/* <Route path="/catalog/:id" component={ProductDetails} /> */}
								{/* <Route path="/about" component={AboutPage} /> */}
								{/* <Route path="/contact" component={ContactPage} /> */}
								{/* <Route path="/server-error" component={ServerError} /> */}
								{/* <Route path="/register" component={Register} /> */}
								{/* <Route path="/import-file" component={ImportFile} /> */}
								{/* <Route path="/chartZaba" component={ChartZaba} /> */}
								{/* <PrivateRoute path="/checkout" component={CheckoutWrapper} /> */}
								{/* <PrivateRoute path="/orders" component={Orders} /> */}
								{/* <PrivateRoute roles={['Admin']} path="/inventory" component={Inventory} /> */}
								{/* <Route exact path="/" component={HomePage} /> */}
								<Route component={NotFound} />
							</Switch>
						</Suspense>
					</Container>
				)}
			/>
			{/* <Grid container spacing={2}>
				<Grid item xs={8} sx={{ ml: 25 }}>
					<Item>xs=8</Item>
				</Grid>
				<Grid item xs={4}>
					<Sidebar setMode={setMode} mode={mode} />
				</Grid>
				<Grid item xs={4}>
					<Item>xs=4</Item>
				</Grid>
				<Grid item xs={8}>
					<Item>xs=8</Item>
				</Grid>
			</Grid> */}
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
