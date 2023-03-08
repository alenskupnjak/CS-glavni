import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash-es';

import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';
import LastFiveResults from '@app/common/LastFiveResults';
import PromotionTeam from '@app/common/PromotionTeam';

import { Box, Typography } from '@mui/material';
import Header from 'components/Header';

const columns = [
	{
		Header: ' ',
		columns: [
			{
				Header: '#',
				accessor: 'position',
				width: 20,
				Cell: props => {
					if (!props.cell.value) return null;
					return <PromotionTeam cell={props} />;
				},
			},
			{
				Header: ' ',
				accessor: 'logo',
				width: 20,
				Cell: ({ cell }) => {
					if (!cell.value) return null;
					return <img src={cell.value} width="25" height="25" className="table-img" alt="Premierie League" />;
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
	const { dataSportTable, loading, destroy, topLeaguesTable, headerTableName } = rootStore.sportsStore;
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

	if (columns && headerTableName) {
		columns[0].Header = headerTableName;
	}
	// https://stackoverflow.com/questions/62304713/update-column-headers-dynamically-react-table-v7
	const cloneColumns = cloneDeep(columns);

	return (
		<Box m="20px" sx={{ backgroundColor: ColorSet().primary[600] }}>
			<Header title="Sports" subtitle="Premiere league" />

			<Box display="flex" justifyContent="space-between">
				<Box m="10px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Typography variant="h5">Events</Typography>
					<Box>Calendar</Box>
					<Box>
						<Typography variant="h5">Top Leagues</Typography>
						{topLeaguesTable &&
							topLeaguesTable.map(data => {
								return (
									<Box
										m={0.5}
										sx={{ display: 'flex' }}
										key={data.idTournament}
										onClick={() => {
											rootStore.sportsStore.loadDataTable(data.idTournament);
										}}
									>
										<img src={data.linkImg} alt={data.tournamentName} width="24" height="24" />
										<Typography ml={1}>{data.tournamentName}</Typography>
									</Box>
								);
							})}
					</Box>
				</Box>

				<Box m="5px" flex="1 1 100%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Table columns={cloneColumns} data={dataSportTable} loading={loading} />
				</Box>
				<Box m="5px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Typography variant="h5">Right</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default observer(PremierLeagueTableDisplay);
