import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { tokens } from '@app/theme/theme';

const Header = ({ title, subtitle }) => {
	const { pallete } = useSelector(store => store.theme);
	return (
		<Box mb="30px">
			<Typography variant="h2" color={tokens[pallete].grey[100]} fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
				{title}
			</Typography>
			<Typography variant="h5" color={tokens[pallete].greenAccent[400]}>
				{subtitle}
			</Typography>
		</Box>
	);
};

export default Header;
