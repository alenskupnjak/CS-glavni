import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import GeographyChart from 'app/components/GeographyChart';
import Header from 'app/components/Header';
import { tokens } from '@app/theme/theme';

const Geography = () => {
	const { pallete } = useSelector(store => store.theme);
	return (
		<Box m="20px">
			<Header title="Geography" subtitle="Simple Geography Chart" />
			<Box height="75vh" border={`1px solid ${tokens[pallete].grey[100]}`} borderRadius="4px">
				<GeographyChart />
			</Box>
		</Box>
	);
};

export default Geography;
