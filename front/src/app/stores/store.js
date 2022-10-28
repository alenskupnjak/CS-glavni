import { createContext, useContext } from 'react';
import ProductStore from './productStore';
import DisplayStore from './displayStore';

export const store = {
	displayStore: new DisplayStore(),
	productStore: new ProductStore(),
};

// Setiram u index.js da mogu prosljedivati vrijednosti
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
