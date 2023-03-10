import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function Sorting(props) {
	const { title, sorting, dir, data } = props;
	console.log('%c Sorting props ', 'color:red', data);

	if (!props) return null;
	return (
		<Box
			className="sorting"
			onClick={() => {
				console.log('%c Sorting ', 'color:green', data);
			}}
		>
			{title}
		</Box>
	);
}
