import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

// react tostify have to go with CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Topbar from '@app/layout/Topbar';
import Sidebar from '@app/layout/Sidebar';
import RightMenu from '@app/layout/RightMenu';
import { ColorModeContext, useMode } from '@app/theme/theme';
import PrivateRoute from '@app/layout/PrivateRoute';
import routes from './routes';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);
	const [menuRight, setMenuRight] = React.useState({
		right: false,
	});

	const toggleDrawer = (open, event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setMenuRight({ ...menuRight, right: open });
	};

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<ToastContainer position="bottom-right" theme="colored" />
					<CssBaseline />
					<div className="app">
						<Sidebar isSidebar={isSidebar} />
						<RightMenuItem isSidebar={isSidebar} toggleDrawer={toggleDrawer} menuRight={menuRight} />
						<main className="content">
							<Topbar setIsSidebar={setIsSidebar} toggleDrawer={toggleDrawer} />
							<Suspense fallback={<div>Loading u APP...</div>}>
								<Routes>
									{routes.map(route => {
										return (
											<Route
												path={route.path}
												key={route.path}
												element={
													route.privateRoute ? (
														<PrivateRoute roles={route.roles}>{route.component}</PrivateRoute>
													) : (
														<route.component />
													)
												}
											/>
										);
									})}
								</Routes>
							</Suspense>
						</main>
					</div>
				</LocalizationProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

function RightMenuItem({ isSidebar, toggleDrawer, menuRight }) {
	return (
		<React.Fragment>
			<Drawer anchor={'right'} open={menuRight['right']} onClose={e => toggleDrawer(false, e)}>
				<Box role="presentation" onKeyDown={e => toggleDrawer(false, e)}>
					<RightMenu isSidebar={isSidebar} />
				</Box>
			</Drawer>
		</React.Fragment>
	);
}

export default observer(App);
