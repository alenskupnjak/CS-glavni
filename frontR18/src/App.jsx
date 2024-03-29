import React from 'react';
import { Suspense } from 'react';
import { observer } from 'mobx-react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// react tostify have to go with CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Topbar from '@app/layout/Topbar';
import Sidebar from '@app/layout/Sidebar';
import RightMenu from '@app/layout/RightMenu';
import { useMode } from '@app/theme/theme';
import PrivateRoute from '@app/layout/PrivateRoute';
import routes from './routes';

import { closeMenu } from '@app/stores/redux/themeSlice';

function App() {
	const { pallete } = useSelector(store => store.theme);
	const [theme] = useMode();
	return (
		// <ColorModeContext.Provider value={colorMode}>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ToastContainer position="bottom-right" theme="colored" />
				<CssBaseline />
				<BrowserRouter>
					<div className="app">
						<Sidebar />
						<RightMenuItem />
						<main className="content">
							<Topbar />
							<Suspense fallback={<div>Loading u APP...</div>}>
								<Routes>
									{routes.map(route => {
										return (
											<Route
												exact={route.exact}
												path={route.path}
												key={route.path}
												element={
													route.privateRoute ? (
														<PrivateRoute roles={route.roles}>{route.component}</PrivateRoute>
													) : (
														<route.component />
													)
												}
											>
												{route.child?.map(child => (
													<Route
														exact={child.exact}
														path={child.path}
														key={child.path}
														element={
															child.privateRoute ? (
																<PrivateRoute roles={child.roles}>{child.component}</PrivateRoute>
															) : (
																<route.component />
															)
														}
													></Route>
												))}
											</Route>
										);
									})}
								</Routes>
							</Suspense>
						</main>
					</div>
				</BrowserRouter>
			</LocalizationProvider>
		</ThemeProvider>
		// </ColorModeContext.Provider>
	);
}

function RightMenuItem() {
	const dispatch = useDispatch();
	const { isOpen } = useSelector(store => store.theme);
	return (
		<React.Fragment>
			<Drawer anchor={'right'} open={isOpen} onClose={() => dispatch(closeMenu())}>
				<Box role="presentation" onKeyDown={() => dispatch(closeMenu())}>
					<RightMenu />
				</Box>
			</Drawer>
		</React.Fragment>
	);
}

export default observer(App);
