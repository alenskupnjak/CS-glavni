import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
// import ReactDOM from 'react-dom/client';    verzija 18
import './app/layout/styles.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Neil
// import { StoreProvider } from './app/context/StoreContext';

import { store, StoreContext } from './app/stores/store';

// console.log('%c process.env= ', 'color:green', process.env);
// export const history = createBrowserHistory();
// https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/
export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

// usnimi postojeceg usera
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
	store.userStore.user = user;
}

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={store}>
			<Router history={history}>
				{/* <StoreProvider> NEIL */}
				<App />
				{/* </StoreProvider> NEIL */}
			</Router>
		</StoreContext.Provider>
	</React.StrictMode>,
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
