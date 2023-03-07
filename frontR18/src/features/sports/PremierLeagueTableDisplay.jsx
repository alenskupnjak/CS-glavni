import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';
import LastFiveResults from '@app/common/LastFiveResults';

import { Box, Typography } from '@mui/material';
import Header from 'components/Header';

const columns = [
	{
		Header: 'Premier League Table',
		columns: [
			{
				Header: '#',
				accessor: 'position',
				width: 20,
			},
			{
				Header: ' ',
				accessor: 'logo',
				width: 20,
				Cell: ({ cell }) => {
					if (!cell.value) return null;
					return <img src={cell.value} width="20" height="20" className="table-img" alt="Premierie League" />;
				},
			},
			{
				Header: 'Team',
				accessor: 'name',
				width: 350,
			},
			{
				Header: 'P',
				accessor: 'matches',
				width: 20,
			},
			{
				Header: 'W',
				accessor: 'wins',
				width: 20,
			},
			{
				Header: 'D',
				accessor: 'draws',
				width: 20,
			},
			{
				Header: 'L',
				accessor: 'losses',
				width: 20,
			},
			{
				Header: 'Goals',
				accessor: 'goals',
				width: 30,
			},
			{
				Header: 'Last',
				accessor: 'lastFive',
				width: 140,
				Cell: ({ cell }) => {
					return <LastFiveResults cell={cell.value} />;
				},
			},
			{
				Header: 'Pts',
				accessor: 'pts',
				width: 30,
			},
			{ accessor: 'fakeData', width: 0 },
		],
	},
];

function PremierLeagueTableDisplay() {
	const { dataSportTable, loading, destroy } = rootStore.sportsStore;
	let initialized = false;
	useEffect(() => {
		try {
			if (!initialized) {
				rootStore.sportsStore.loadDataTable();
			}
		} catch (error) {
			console.log('%c error ', 'color:red', error);
		}
		return () => {
			if (initialized) destroy();
			// eslint-disable-next-line
			initialized = true;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<Box m="20px" sx={{ backgroundColor: ColorSet().primary[400] }}>
			<Header title="Sports" subtitle="Premiere league" />

			<Box display="flex" justifyContent="space-between">
				<Box m="10px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().grey[400] }}>
					<Typography variant="h5">Events</Typography>
				</Box>

				<Box flex="1 1 100%">
					<Table columns={columns} data={dataSportTable} loading={loading} />
				</Box>
				<Box flex="1 1 30%" sx={{ backgroundColor: ColorSet().greenAccent[400] }}>
					<Typography variant="h5">Right</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default observer(PremierLeagueTableDisplay);
