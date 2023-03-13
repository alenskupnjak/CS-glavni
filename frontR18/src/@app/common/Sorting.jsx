import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function Sorting(props) {
	const { title, data, column } = props;
	console.log('%c Sorting props ', 'color:blue', data);
	console.log('%c Sorting column ', 'color:gold', column, data.column.id);

	if (!props) return null;
	return (
		<Box
			className="sorting"
			onClick={() => {
				data.store.additionalFilter.column = data.column.id;
				if (data.store?.additionalFilter?.sort === '') {
					data.store.additionalFilter.sort = 'asc';
				} else if (data.store?.additionalFilter?.sort === 'asc') {
					data.store.additionalFilter.sort = 'desc';
				} else if (data.store?.additionalFilter?.sort === 'desc') {
					data.store.additionalFilter.sort = '';
				}

				console.log('%c Sorting= ', 'color:blue', data, data.column.id);
				data.state.fetchData(data.store);
			}}
		>
			{title}
			{column === data.column.id && data?.store?.additionalFilter?.sort}
		</Box>
	);
}
