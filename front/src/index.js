import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
// import ReactDOM from 'react-dom/client';    verzija 18
import './app/layout/styles.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { store, StoreContext } from './app/stores/store';

console.log('%c process.env= ', 'color:green', process.env);
// export const history = createBrowserHistory();
//  https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/
export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

store.userStore.fetchCurrentUser();

ReactDOM.render(
	// <React.StrictMode>
	<StoreContext.Provider value={store}>
		<Router history={history}>
			<App />
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
