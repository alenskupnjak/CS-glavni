import React from 'react';
import PropTypes from 'prop-types';
import ColorSet from '@app/theme/colorSet';
import { Box } from '@mui/material';

export default function PromotionTeam(props) {
	const { cell } = props;
	if (!cell) return null;
	const dataCell = cell.data[cell.value - 1]?.promotion?.text;

	if (dataCell === 'Relegation') {
		return (
			<Box className="relegation" title="Relegation" sx={{ backgroundColor: ColorSet().redAccent[600] }}>
				{cell.value}
			</Box>
		);
	} else if (dataCell === 'Champions League') {
		return (
			<Box className="relegation" title="Champions League" sx={{ backgroundColor: ColorSet().greenAccent[600] }}>
				{cell.value}
			</Box>
		);
	} else if (dataCell === 'UEFA Europa League') {
		return (
			<Box className="relegation" title="UEFA Europa League" sx={{ backgroundColor: ColorSet().blueAccent[400] }}>
				{cell.value}
			</Box>
		);
	} else if (dataCell === 'UEFA Conference League') {
		return (
			<Box className="relegation" title="UEFA Conference League" sx={{ backgroundColor: ColorSet().blueAccent[600] }}>
				{cell.value}
			</Box>
		);
	} else {
		return <div className="relegation">{cell.value}</div>;
	}
}

PromotionTeam.protoType = {
	props: PropTypes.object,
};
