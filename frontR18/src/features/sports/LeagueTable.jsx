import React, { useEffect, useState } from 'react';
import { TableStore } from '@app/stores/tableStore';
import LeagueTableDisplay from './LeagueTableDisplay';

export default function LeagueTable() {
	const [tableStore, setTableStore] = useState(null);
	const [tableStoreOdds, setTableStoreOdds] = useState(null);

	useEffect(() => {
		const store = new TableStore('Table leauge');
		const storeOdds = new TableStore('odds');

		const filter = {
			statusFilter: 1,
			isFsr: true,
			pageSize: 20,
			pageNumber: 1,
		};
		const filterOdds = {
			statusFilter: 1,
			isFsr: true,
			pageSize: 10,
			pageNumber: 1,
			sort: '',
			column: '',
		};

		store.setFilter(filter);
		storeOdds.setFilter(filterOdds);

		setTableStore(store);
		setTableStoreOdds(storeOdds);
		return () => tableStore?.reset();
		// eslint-disable-next-line
	}, []);

	return <LeagueTableDisplay store={tableStore} storeOdds={tableStoreOdds} />;
}
