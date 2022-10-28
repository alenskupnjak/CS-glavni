import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
// import ReactDOM from 'react-dom/client';    verzija 18
import './app/layout/styles.css';
// import { BrowserRouter, Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//  Neil
// import { StoreProvider } from './app/context/StoreContext';

// moje
import { store, StoreContext } from './app/stores/store';

export const history = createBrowserHistory();
// export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
	// <React.StrictMode>
	<StoreContext.Provider value={store}>
		<Router history={history}>
			{/* <StoreProvider> NEIL */}
			<App />
			{/* </StoreProvider> NEIL */}
		</Router>
	</StoreContext.Provider>,
	// </React.StrictMode>,
	document.getElementById('root')
);

// ReactDOM.render(
// 	// <React.StrictMode>s
// 	<StoreContext.Provider value={store}>
// 		<Router history={history}>
// 			<ScrollToTop />
// 			<App />
// 		</Router>
// 	</StoreContext.Provider>,
// 	// </React.StrictMode>,
// 	document.getElementById('root')
// );

// Verzija 18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
