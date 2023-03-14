import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';

import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';
import LastFiveResults from '@app/common/LastFiveResults';
import Sorting from '@app/common/Sorting';
import PromotionTeam from '@app/common/PromotionTeam';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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
					if (!cell.value) return null;
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

function LeagueTableDisplay({ store, storeOdds }) {
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
					Header: e => {
						return (
							<Box onClick={() => (sortRef.current = '1')}>
								<Sorting ref={sortRef} title="1" column="1" data={e} />
							</Box>
						);
					},
					accessor: 'homeOdd',
					width: 20,
				},
				{
					Header: e => {
						return (
							<Box onClick={() => (sortRef.current = 'X')}>
								<Sorting ref={sortRef} title="X" column="X" data={e} />
							</Box>
						);
					},
					accessor: 'drawOdd',
					width: 20,
				},
				{
					Header: e => {
						return (
							<Box onClick={e => (sortRef.current = '2')}>
								<Sorting ref={sortRef} title="2" column="2" data={e} />
							</Box>
						);
					},
					accessor: 'awayOdd',
					width: 20,
				},
				{ accessor: 'fakeData', width: 0 },
			],
		},
	];

	const {
		dataSportTable,
		loading,
		destroy,
		topLeaguesTable,
		headerTableName,
		idTable,
		changeDay,
		loadDataOddsTable,
		scheduleDay,
		loadDataTable,
		dataSportTableNew,
	} = rootStore.sportsStore;
	const sortRef = useRef(null);

	let initialized = false;
	useEffect(() => {
		try {
			if (!initialized) {
				rootStore.sportsStore.loadDataTable();
			}
		} catch (err) {
			console.log('%c error useEffect ', 'color:red', err);
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

	const cloneColumns = cloneDeep(columns);

	return (
		<Box m="20px" sx={{ backgroundColor: ColorSet().primary[600] }}>
			<Header title="Sports" subtitle="Premiere league" />

			<Box display="flex" justifyContent="space-between">
				<Box m="10px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Typography variant="h5">Events</Typography>
					<DateCalendar
						onChange={e => {
							changeDay(dayjs(e).format('YYYY-MM-DD'), storeOdds);
						}}
					/>
					<Box>
						<Typography variant="h4">Top Leagues</Typography>
						{topLeaguesTable &&
							topLeaguesTable.map(data => {
								return (
									<Box
										m={0.5}
										sx={{ display: 'flex' }}
										key={data.idTable}
										onClick={() => {
											rootStore.sportsStore.loadDataTable(null, data.idTable);
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
					<Typography variant="h4">{headerTableName}</Typography>
					{/* {store && (
						<Table
							columns={cloneColumns}
							data={dataSportTable}
							// fetchData={loadDataTable}
							loading={loading}
							store={store}
							showPaging={false}
						/>
					)} */}
					{store &&
						dataSportTableNew &&
						dataSportTableNew.map((data, idx) => {
							{
								return (
									<Box alignItems="center" key={idx}>
										{data.groupName && (
											<Typography
												alignItems="center"
												variant="h4"
												sx={{ justifyContent: 'center', textAlign: 'center' }}
											>
												{data.groupName}
											</Typography>
										)}
										<Table
											columns={cloneColumns}
											data={data.mapData}
											loading={loading}
											store={store}
											showPaging={false}
											hideHeader={true}
										/>
									</Box>
								);
							}
						})}
					{storeOdds && (
						<Table
							columns={columnsEvents}
							data={scheduleDay}
							// loading={loadingFetch}
							idTable={idTable}
							fetchData={loadDataOddsTable}
							store={storeOdds}
							showPaging={true}
						/>
					)}
				</Box>
				<Box m="5px" flex="1 1 30%" p="15px" borderRadius="4px" sx={{ backgroundColor: ColorSet().primary[400] }}>
					<Typography variant="h5">Right</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default observer(LeagueTableDisplay);
