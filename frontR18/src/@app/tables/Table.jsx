import React from 'react';
import { observer } from 'mobx-react';
import { useTable, usePagination, useAsyncDebounce, useResizeColumns } from 'react-table';
import Pagination from './Pagination';
import { Box } from '@mui/material';
import ColorSet from '@app/theme/colorSet';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isEmpty } from 'lodash-es';

function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
	// const [hoveredRow, setHoveredRow] = useState(null);

	console.log('%c 333 ', 'color:green', columns);

	const fakeData = numFakeData => {
		const tempArray = [];
		for (let index = 0; index < numFakeData; index++) {
			tempArray.push({ fakeData: index });
		}
		return tempArray;
	};

	// const getTrProps = (state, rowInfo) => {
	// 	console.log('%c 00 ', 'color:green', rowInfo);
	// 	if (rowInfo && rowInfo.row) {
	// 		return {
	// 			onMouseEnter: e => {
	// 				setHoveredRow(rowInfo.index);
	// 			},
	// 			onMouseLeave: e => {
	// 				setHoveredRow(null);
	// 			},
	// 			style: {
	// 				background: rowInfo.index === hoveredRow ? '#efefef' : 'white',
	// 			},
	// 		};
	// 	} else return {};
	// };

	// const defaultColumn = React.useMemo(
	// 	() => ({
	// 		minWidth: 30,
	// 		width: 150,
	// 		maxWidth: 350,
	// 	}),
	// 	[]
	// );
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
			data: !isEmpty(data) ? data : fakeData(20),
			initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['fakeData'] },
			manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching -> we'll also have to provide our own
			pageCount: controlledPageCount,
			// getTrProps: getTrProps,
			// defaultColumn,
		},
		usePagination,
		useResizeColumns
	);

	// Debounce our onFetchData call for 100ms
	const onFetchDataDebounced = useAsyncDebounce(fetchData, 100);

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		if (fetchData) {
			onFetchDataDebounced({ pageIndex, pageSize });
		}
		// eslint-disable-next-line
	}, [fetchData, pageIndex, pageSize]);

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
					padding: '6px',
					borderBottom: '1px solid black',
					// backgroundColor: 'gold',
					// borderRight: '1px solid black',
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
					backgroundColor: ColorSet().blueAccent[700],
					color: ColorSet().grey[200],
				},
			}}
		>
			<SkeletonTheme baseColor={ColorSet().grey[300]} highlightColor="#3e4396" borderRadius="0.5rem" duration={1}>
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
										return (
											<td
												{...cell.getCellProps({
													style: { width: cell.column.width, height: 30 },
												})}
											>
												{loading ? <Skeleton containerClassName="fix-skeleton-height" /> : cell.render('Cell')}
											</td>
										);
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
			</SkeletonTheme>
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
