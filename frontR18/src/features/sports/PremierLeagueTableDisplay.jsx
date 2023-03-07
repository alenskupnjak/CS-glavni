import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';
import LastFiveResults from '@app/common/LastFiveResults';

import { Container } from '@mui/material';
import Header from 'components/Header';

const columns = [
	{
		Header: 'Premier League Table',
		columns: [
			{
				Header: '#',
				accessor: 'position',
			},
			{
				Header: 'Name',
				accessor: 'logo',
				Cell: ({ cell }) => {
					if (!cell.value) return null;
					return <img src={cell.value} width="26" height="26" className="table-img" alt="Premierie League" />;
				},
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'P',
				accessor: 'matches',
			},
			{
				Header: 'W',
				accessor: 'wins',
			},
			{
				Header: 'D',
				accessor: 'draws',
			},
			{
				Header: 'L',
				accessor: 'losses',
			},
			{
				Header: 'Goals',
				accessor: 'goals',
			},
			{
				Header: 'Last',
				accessor: 'lastFive',
				Cell: ({ cell }) => {
					if (!cell.value) return null;
					return <LastFiveResults cell={cell.value} />;
				},
			},
			{
				Header: 'Pts',
				accessor: 'pts',
			},
		],
	},
];

function PremierLeagueTableDisplay() {
	const { dataSport, loading } = rootStore.sportsStore;
	let initialized = false;
	useEffect(() => {
		try {
			if (!initialized) {
				rootStore.sportsStore.loadDataTable();
			}
		} catch (error) {
			console.log('%c error ', 'color:red', error);
		}
		// ovaj return se okida kada je komponenta destroyed
		return () => {
			// if (initialized) destroy();
			// eslint-disable-next-line
			initialized = true;
		};
		// eslint-disable-next-line
	}, []);

	console.log('%c data for table ', 'color:green', loading);

	if (!dataSport) return null;
	return (
		<Container m="20px" sx={{ backgroundColor: ColorSet().primary[400] }}>
			<Header title="Sports" subtitle="Premiere league" />
			<Table columns={columns} data={dataSport} />
		</Container>
	);
}

export default observer(PremierLeagueTableDisplay);
