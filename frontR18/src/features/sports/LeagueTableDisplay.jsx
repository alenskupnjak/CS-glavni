import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash-es';

import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';
import LastFiveResults from '@app/common/LastFiveResults';
import Sorting from '@app/common/Sorting';
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

const columnsEvents = [
	{
		Header: 'Data day ',
		columns: [
			{
				Header: ' ',
				accessor: 'num',
				width: 1,
			},
			{
				Header: 'Id',
				accessor: 'id',
				width: 10,
			},
			{
				Header: 'Home',
				accessor: 'homeTeam',
				width: 15,
			},
			{
				Header: 'Away',
				accessor: 'awayTeam',
				width: 15,
			},
			{
				Header: 'Liga',
				accessor: 'liga',
				width: 25,
			},
			{
				Header: 'Category',
				accessor: 'category',
				width: 20,
			},
			{
				Header: 'Status',
				accessor: 'status',
				width: 20,
			},
			{
				Header: '1',
				accessor: 'homeOdd',
				width: 20,
			},
			{
				Header: 'X',
				accessor: 'drawOdd',
				width: 20,
			},
			{
				Header: e => {
					return <Sorting title="2" fetch={rootStore.sportsStore.loadDataTable} data={e} />;
				},
				accessor: 'awayOdd',
				width: 20,
			},
		],
	},
];

function LeagueTableDisplay({ store, storeOdds }) {
	const { dataSportTable, loading, destroy, topLeaguesTable, headerTableName, scheduleDay, sortDir, idTournament } =
		rootStore.sportsStore;
	const [data, setData] = React.useState([]);
	// const [loadingFetch, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const fetchIdRef = React.useRef(0);
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

	const fetchData = React.useCallback(async ({ pageSize, pageIndex }) => {
		// setLoading(true);
		// This will get called when the table needs new data
		// You could fetch your data from literally anywhere,
		// even a server. But for this example, we'll just fake it.

		// Give this fetch an ID
		const fetchId = ++fetchIdRef.current;

		console.log('%c current ', 'color:red', fetchId, fetchIdRef);

		// Only update the data if this is the latest fetch
		if (fetchId === fetchIdRef.current) {
			// const response = await rootStore.sportsStore.loadDataTable();
			const startRow = pageSize * pageIndex;
			const endRow = startRow + pageSize;
			setData(scheduleDay.slice(startRow, endRow));

			// Your server could send back total page count.
			// For now we'll just fake it, too
			setPageCount(Math.ceil(scheduleDay.length / pageSize));

			// setLoading(false);
		}
	}, []);

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
					<Table columns={cloneColumns} data={dataSportTable} loading={loading} store={store} />
					<Table
						columns={columnsEvents}
						data={data}
						loading={loading}
						sortDir={sortDir}
						idTour={idTournament}
						fetchData={fetchData}
						store={storeOdds}
						pageCount={pageCount}
					/>
				</Box>
				<Box m="5px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Typography variant="h5">Right</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default observer(LeagueTableDisplay);
