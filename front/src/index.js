import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';    verzija 18
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
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
