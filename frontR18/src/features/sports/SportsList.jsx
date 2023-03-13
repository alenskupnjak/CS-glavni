import React, { useEffect, useState } from 'react';
import { TableStore } from '@app/stores/tableStore';
import SportsListDisplay from './SportsListDisplay';

export default function SportsList() {
	const [tableStore, setTableStore] = useState(null);

	useEffect(() => {
		const store = new TableStore('Sport List');
		const filter = {
			status: 1,
			isFsr: true,
			pageSize: 10,
			pageNumber: 1,
			sort: '',
		};
		store.setFilter(filter);
		setTableStore(store);

		return () => tableStore?.reset();
		// eslint-disable-next-line
	}, []);

	return <SportsListDisplay store={tableStore} />;
}
