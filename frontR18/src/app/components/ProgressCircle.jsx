import { Box } from '@mui/material';
import { tokens } from '@app/theme/theme';
import { useSelector } from 'react-redux';

const ProgressCircle = ({ progress = '0.75', size = '40' }) => {
	const { pallete } = useSelector(store => store.theme);
	const colors = tokens[pallete];
	const angle = progress * 360;
	return (
		<Box
			sx={{
				background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
				borderRadius: '50%',
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
};

export default ProgressCircle;
