import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';

import { isEmpty } from 'lodash-es';
import { Box } from '@mui/material';

const Styles = styled.div`
	padding: 1rem;
	table {
		background-color: blue;
		border-spacing: 0;
		border: 1px solid black;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;

			:last-child {
				border-right: 0;
			}
		}
	}
`;

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
	const { loadAllSportsData, dataSport } = rootStore.sportsStore;

	// We'll start our table without any data
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const fetchIdRef = React.useRef(0);

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			loadAllSportsData();
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
		// Set the loading state
		setLoading(true);
		// This will get called when the table needs new data
		// You could fetch your data from literally anywhere,
		// even a server. But for this example, we'll just fake it.

		// Give this fetch an ID
		const fetchId = ++fetchIdRef.current;

		// Only update the data if this is the latest fetch
		if (fetchId === fetchIdRef.current) {
			const response = await loadAllSportsData();
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
		<Box sx={{ backgroundColor: ColorSet().blueAccent[600] }}>
			<Styles>
				<Table columns={columns} data={data} fetchData={fetchData} loading={loading} pageCount={pageCount} />
			</Styles>
		</Box>
	);
}

export default observer(SportsListDisplay);
