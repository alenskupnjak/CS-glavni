import React from 'react';
import { observer } from 'mobx-react';
import Table from '@app/tables/Table';
import { rootStore } from '@app/stores';
import ColorSet from '@app/theme/colorSet';

import { Container } from '@mui/material';
import Header from 'components/Header';

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

function SportsListDisplay({ store }) {
	const { dataSport, loading, loadAllSportsData } = rootStore.sportsStore;

	return (
		<Container m="20px" sx={{ backgroundColor: ColorSet().primary[400] }}>
			<Header title="Sports" subtitle="Managing the Team Members" />
			{store && (
				<Table
					columns={columns}
					data={dataSport}
					loading={loading}
					fetchData={loadAllSportsData}
					store={store}
					showPaging={true}
				/>
			)}
		</Container>
	);
}

export default observer(SportsListDisplay);
