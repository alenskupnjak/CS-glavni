import { Suspense, useState } from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import Topbar from '@app/layout/Topbar';
import Sidebar from '@app/layout/Sidebar';

// react tostify have to go with CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './@app/theme/theme';
import PrivateRoute from './@app/layout/PrivateRoute';
import routes from './routes';

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
				<CssBaseline />
				<div className="app">
					<Sidebar isSidebar={isSidebar} />
					<main className="content">
						<Topbar setIsSidebar={setIsSidebar} />
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
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default observer(App);
