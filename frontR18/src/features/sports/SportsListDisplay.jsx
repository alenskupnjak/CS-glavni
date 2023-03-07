import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';

import { Container } from '@mui/material';
import Header from 'components/Header';

const columns = [
	{
		Header: 'Name',
		columns: [
			{
				Header: 'Key',
				accessor: 'key',
			},
			{
				Header: 'Group',
				accessor: 'group',
			},
		],
	},
	{
		Header: 'Info',
		columns: [
			{
				Header: 'Title',
				accessor: 'title',
			},
			{
				Header: 'description',
				accessor: 'description',
			},
			{
				Header: 'Has_outrights',
				accessor: 'has_outrights',
			},
			{
				Header: 'Active',
				accessor: 'active',
			},
		],
	},
];

// Let's simulate a large dataset on the server (outside of our component)
// const serverData = makeData(5000);

function SportsListDisplay() {
	// We'll start our table without any data
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const fetchIdRef = React.useRef(0);

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			rootStore.sportsStore.loadAllSportsData();
		}
		// ovaj return se okida kada je komponenta destroyed
		return () => {
			// if (initialized) destroy();
			// eslint-disable-next-line
			initialized = true;
		};
		// eslint-disable-next-line
	}, []);

	const fetchData = React.useCallback(async ({ pageSize, pageIndex }) => {
		setLoading(true);
		// This will get called when the table needs new data
		// You could fetch your data from literally anywhere,
		// even a server. But for this example, we'll just fake it.

		// Give this fetch an ID
		const fetchId = ++fetchIdRef.current;

		// Only update the data if this is the latest fetch
		if (fetchId === fetchIdRef.current) {
			const response = await rootStore.sportsStore.loadAllSportsData();
			const startRow = pageSize * pageIndex;
			const endRow = startRow + pageSize;
			setData(response.slice(startRow, endRow));

			// Your server could send back total page count.
			// For now we'll just fake it, too
			setPageCount(Math.ceil(response.length / pageSize));

			setLoading(false);
		}
	}, []);

	return (
		<Container m="20px" sx={{ backgroundColor: ColorSet().primary[400] }}>
			<Header title="Sports" subtitle="Managing the Team Members" />
			<Table columns={columns} data={data} fetchData={fetchData} loading={loading} pageCount={pageCount} />
		</Container>
	);
}

export default observer(SportsListDisplay);
