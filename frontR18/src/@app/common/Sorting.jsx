import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function Sorting(props) {
	const { title, sorting, dir, data } = props;
	// console.log('%c Sorting props ', 'color:blue', data?.store);

	if (!props) return null;
	return (
		<Box
			className="sorting"
			onClick={() => {
				console.log('%c Sorting ', 'color:green', data);
			}}
		>
			{title}
			{data?.store?.additionalFilter?.sort}
		</Box>
	);
}
