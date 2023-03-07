import React from 'react';
import { observer } from 'mobx-react';
import { useTable, usePagination, useAsyncDebounce } from 'react-table';
import Pagination from './Pagination';
import { Box } from '@mui/material';
import ColorSet from '@app/theme/colorSet';

function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page which has only the rows for the active page
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		// Get the state from the instance
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
			manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching -> we'll also have to provide our own pageCount.
			pageCount: controlledPageCount,
		},
		usePagination
	);

	// Debounce our onFetchData call for 100ms
	const onFetchDataDebounced = useAsyncDebounce(fetchData, 100);

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		onFetchDataDebounced({ pageIndex, pageSize });
		// eslint-disable-next-line
	}, [fetchData, pageIndex, pageSize]);

	// Render the UI for your table
	if (loading) return <div>Loading data......</div>;
	return (
		<Box
			sx={{
				padding: '1rem',
				'& table': {
					// color: ' red',
					// backgroundColor: 'gold',
					border: '1px solid black',
					borderSpacing: '0',
				},
				'& table tr:last-child td': {
					borderBottom: '0',
				},
				'& table th': {
					margin: '0',
					padding: '0.5rem',
					borderBottom: '1px solid black',
					borderRight: '1px solid black',
				},
				'& table th:last-child': {
					borderRight: '0',
				},
				'& table td': {
					margin: '0',
					padding: '0.5rem',
					borderBottom: '1px solid black',
					borderRight: '1px solid black',
				},
				'& table td:last-child': {
					borderRight: '0',
				},
				'& table thead': {
					backgroundColor: ColorSet().blueAccent[700],
				},
			}}
		>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								onClick={() => {
									console.log('%c 17 ', 'color:green', row);
								}}
							>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
								})}
							</tr>
						);
					})}
					{/* <tr>
						{loading ? (
							// Use our custom loading state to show a loading indicator
							<td colSpan="10000">Loading data...</td>
						) : (
							<td colSpan="10000">
								Showing {page.length} of ~{controlledPageCount * pageSize} results
							</td>
						)}
					</tr> */}
				</tbody>
			</table>
			{pageCount && (
				<Pagination
					pageIndex={pageIndex}
					pageOptions={pageOptions}
					gotoPage={gotoPage}
					canPreviousPage={canPreviousPage}
					previousPage={previousPage}
					pageCount={pageCount}
					nextPage={nextPage}
					canNextPage={canNextPage}
					pageSize={pageSize}
					setPageSize={setPageSize}
				/>
			)}
		</Box>
	);
}

export default observer(Table);
