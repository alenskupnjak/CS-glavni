import React from 'react';
import { observer } from 'mobx-react';
import { useTable, usePagination, useAsyncDebounce } from 'react-table';
import Pagination from './Pagination';

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
	}, [fetchData, pageIndex, pageSize]);

	// Render the UI for your table
	return (
		<React.Fragment>
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
					<tr>
						{loading ? (
							// Use our custom loading state to show a loading indicator
							<td colSpan="10000">Loading data...</td>
						) : (
							<td colSpan="10000">
								Showing {page.length} of ~{controlledPageCount * pageSize} results
							</td>
						)}
					</tr>
				</tbody>
			</table>
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
		</React.Fragment>
	);
}

export default observer(Table);
