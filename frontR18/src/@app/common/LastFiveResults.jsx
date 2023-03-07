import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function LastFiveResults({ cell }) {
	return (
		<div className="last-five-results">
			{cell.map(data => {
				if (data.res === 'D') {
					return (
						<Box className="five-results" sx={{ backgroundColor: ColorSet().grey[500] }}>
							{data.res}
						</Box>
					);
				} else if (data.res === 'W') {
					return (
						<Box className="five-results" sx={{ backgroundColor: ColorSet().greenAccent[600] }}>
							{data.res}
						</Box>
					);
				} else {
					return (
						<Box className="five-results" sx={{ backgroundColor: ColorSet().redAccent[500] }}>
							{data.res}
						</Box>
					);
				}
			})}
		</div>
	);
}
