import { createContext, useContext, useState } from 'react';
// import { Basket } from '../models/basket';

export const StoreContext = createContext(undefined);

export function useStoreContext() {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw Error('Oops - we do not seem to be inside the provider');
	}
	return context;
}

export function StoreProvider({ children }) {
	const [basket, setBasket] = useState(null);
	const [slon, setSlon] = useState('slon');
	function removeItem(productId, quantity) {
		if (!basket) return;
		const items = [...basket.items];
		const itemIndex = items.findIndex(i => i.productId === productId);
		const slon = 'slon';
		console.log('%c 00', 'color:green', slon);

		if (itemIndex >= 0) {
			items[itemIndex].quantity -= quantity;
			if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
			setBasket(prevState => {
				return { ...prevState, items };
			});
		}
	}
	// van upotrebem staro
	return <StoreContext.Provider value={{ basket, setBasket, removeItem, slon }}>{children}</StoreContext.Provider>;
}
