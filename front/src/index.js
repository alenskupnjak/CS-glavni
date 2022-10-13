import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
// import ReactDOM from 'react-dom/client';    verzija 18
import './app/layout/styles.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
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
