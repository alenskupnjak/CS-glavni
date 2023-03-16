import React from 'react';
import { observer } from 'mobx-react';
import { useTable, usePagination, useAsyncDebounce, useResizeColumns } from 'react-table';
import Pagination from './Pagination';
import { Box } from '@mui/material';
import ColorSet from '@app/theme/colorSet';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isEmpty } from 'lodash-es';

function Table({ columns, data, fetchData, loading, idTable, store, showPaging, hideHeader }) {
	const { pagingStore, additionalFilter } = store;

	// console.log('%c TABLE store= ', 'color:blue', store);
	// console.log('%c TABLE store= ', 'color:blue', pagingStore);
	// console.log('%c TABLE store= ', 'color:blue', pagingStore.pageSize);
	const fakeData = numFakeData => {
		const tempArray = [];
		for (let index = 0; index < numFakeData; index++) {
			tempArray.push({ fakeData: index });
		}
		return tempArray;
	};

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
			data: !isEmpty(data) ? data : fakeData(additionalFilter.pageSize ?? pagingStore.pageSize),
			initialState: {
				pageIndex: pagingStore.currentPage - 1 || 0,
				pageSize: pagingStore.pageSize || 10,
				hiddenColumns: ['fakeData'],
				idTable,
				fetchData: (store, colummn) => {
					fetchData(store, colummn);
				},
			},
			manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching -> we'll also have to provide our own
			pageCount: pagingStore.totalPages,
			autoResetPage: false,
			store,
		},
		useResizeColumns,
		usePagination
	);

	// Debounce our onFetchData call for 50ms
	const onFetchDataDebounced = useAsyncDebounce(fetchData, 50);

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		if (fetchData) {
			onFetchDataDebounced(store, idTable);
		}
		// eslint-disable-next-line
	}, [pageIndex, pageSize]);

	return (
		<Box
			sx={{
				padding: '6px',
				'& table': {
					// color: ' red',
					// border: '1px solid black',
					borderSpacing: '0',
					width: '100%',
					// color: ColorSet().grey[200],
				},
				'& table tr:last-child td': {
					borderBottom: '0',
				},
				'& table th': {
					margin: '0',
					padding: '6px',
					borderBottom: '1px solid black',
					// borderRight: '1px solid black',
				},
				'& table th:last-child': {
					borderRight: '0',
				},
				'& table td': {
					margin: '0',
					padding: '3px',
					borderBottom: '1px solid black',

					fontSize: '1.1rem',
				},
				'& table tbody tr:hover': {
					margin: '0',
					padding: '6px',
					backgroundColor: ColorSet().primary[500],
					borderBottom: '5px solid red !important',
				},
				'& table td:hover': {
					// borderRight: '5px solid blue',
				},
				'& table td:last-child': {
					borderRight: '0',
				},
				'& table thead': {
					backgroundColor: ColorSet().blueAccent[800],
					// color: ColorSet().grey[200],
					fontSize: '1rem',
				},
			}}
		>
			<SkeletonTheme baseColor={ColorSet().grey[300]} highlightColor="#3e4396" borderRadius="0.5rem" duration={1}>
				<table {...getTableProps()}>
					{!hideHeader && (
						<thead>
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map(column => {
										// console.log('%c column ', 'color:green', column);

										return <th {...column.getHeaderProps()}>{column.render('Header')}</th>;
									})}
								</tr>
							))}
						</thead>
					)}
					<tbody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									onClick={() => {
										console.log('%c getRowProps= ', 'color:green', row);
									}}
								>
									{row.cells.map(cell => {
										return (
											<td
												{...cell.getCellProps({
													style: { width: cell.column.width, height: 35 },
												})}
											>
												{loading ? <Skeleton containerClassName="fix-skeleton-height" /> : cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</SkeletonTheme>
			{showPaging && (
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
					store={store}
				/>
			)}
		</Box>
	);
}

export default observer(Table);
