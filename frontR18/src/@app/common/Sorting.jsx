import React from 'react';
import { Box } from '@mui/material';

const Sorting = React.forwardRef((props, ref) => {
	const { title, data, column } = props;

	if (!props) return null;
	return (
		<Box>
			<Box
				id={column}
				// ref={ref}
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
					data.state.fetchData(data.store);
				}}
			>
				{title}
			</Box>
			<Box>{column === ref?.current ? data.store.additionalFilter.sort : null}</Box>
		</Box>
	);
});

export default Sorting;
