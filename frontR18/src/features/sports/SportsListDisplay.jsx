import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { useTable } from 'react-table';
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

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});

	// Render the UI for your table
	return (
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
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

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

function SportsListDisplay() {
	const { loadAllSportsData, dataSport } = rootStore.sportsStore;
	// const data = React.useMemo(() => makeData(20), []);

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			loadAllSportsData();
			// data = [...makeData(20)];
		}

		// ovaj return se okida kada je komponenta destroyed
		return () => {
			// if (initialized) destroy();
			/* eslint-disable */
			initialized = true;
			/* eslint-enable */
		};
	}, []);

	if (isEmpty(dataSport)) return null;
	return (
		<Box sx={{ backgroundColor: ColorSet().blueAccent[600] }}>
			<Styles>
				<Table columns={columns} data={dataSport} />
			</Styles>
		</Box>
	);
}

export default observer(SportsListDisplay);
