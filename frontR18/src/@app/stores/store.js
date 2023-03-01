import { createContext, useContext } from 'react';
import ProductStore from './productStore';
import DisplayStore from '@app/stores/displayStore';
import UserStore from '@app/stores/userStore';
import ChartStore from '@app/stores/chartStore';

export const store = {
	displayStore: new DisplayStore(),
	productStore: new ProductStore(),
	userStore: new UserStore(),
	chartStore: new ChartStore(),
};

// Setiram u index.js da mogu prosljedivati vrijednosti
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
