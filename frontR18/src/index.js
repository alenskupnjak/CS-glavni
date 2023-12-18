import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { storeRedux } from 'storeRedux';

// React tooltip
import 'react-tooltip/dist/react-tooltip.css';

import { store, StoreContext } from '@app/stores/store';

// export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL, forceRefresh: true });

// load user if exist
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
	store.userStore.user = user;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={storeRedux}>
			<StoreContext.Provider value={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</StoreContext.Provider>
		</Provider>
	</React.StrictMode>
);
