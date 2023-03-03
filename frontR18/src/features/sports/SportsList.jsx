import React, { useEffect, useState } from 'react';
import { TableStore } from '@app/stores/tableStore';
import SportsListDisplay from './SportsListDisplay';

export default function SportsList() {
	const [tableStore, setTableStore] = useState(null);

	useEffect(() => {
		const store = new TableStore();

		const filter = {
			status: 1,
			isFsr: true,
			pageSize: 10,
			pageNumber: 1,
		};

		store.setFilter(filter);

		setTableStore(store);
		return () => tableStore?.reset();
	}, []);

	return <SportsListDisplay store={tableStore} />;
}
