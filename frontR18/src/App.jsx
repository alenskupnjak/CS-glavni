import { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';

// react tostify have to go with CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Team from './scenes/team/Team';
import Invoices from './scenes/invoices/Invoices';
import Contacts from './scenes/contacts/Contacts';
import Bar from './scenes/bar/Bar';

import Line from './scenes/line/Line';
import Pie from './scenes/pie/Pie';
import FAQ from './scenes/faq/FAQ';
import Geography from './scenes/geography/Geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/Calendar';
import PrivateRoute from './app/layout/PrivateRoute';

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
								{/* <Route path="/team" element={<Team />} /> */}
								{/* <Route path="/contacts" element={<Contacts />} />
							<Route path="/invoices" element={<Invoices />} />
							<Route path="/form" element={<Form />} />
							<Route path="/bar" element={<Bar />} />
							<Route path="/pie" element={<Pie />} />
							<Route path="/line" element={<Line />} />
							<Route path="/faq" element={<FAQ />} />
							<Route path="/calendar" element={<Calendar />} />
							<Route path="/geography" element={<Geography />} /> */}
								{/* <Route path="/" element={<HomePage />} /> */}
								{/* <Route path="*" element={<NotFound />} /> */}
							</Routes>
						</Suspense>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
