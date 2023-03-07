import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function LastFiveResults({ cell }) {
	return (
		<div className="last-five-results">
			{cell &&
				cell.map((data, ind) => {
					if (data.res === 'D') {
						return (
							<Box className="five-results" key={ind} sx={{ backgroundColor: ColorSet().grey[500] }}>
								{data.res}
							</Box>
						);
					} else if (data.res === 'W') {
						return (
							<Box className="five-results" key={ind} sx={{ backgroundColor: ColorSet().greenAccent[600] }}>
								{data.res}
							</Box>
						);
					} else {
						return (
							<Box className="five-results" key={ind} sx={{ backgroundColor: ColorSet().redAccent[600] }}>
								{data.res}
							</Box>
						);
					}
				})}
		</div>
	);
}
