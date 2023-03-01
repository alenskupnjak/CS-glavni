import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { store, StoreContext } from './@app/stores/store';

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

// usnimi postojeceg usera
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
	store.userStore.user = user;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<StoreContext.Provider value={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreContext.Provider>
	</React.StrictMode>
);
