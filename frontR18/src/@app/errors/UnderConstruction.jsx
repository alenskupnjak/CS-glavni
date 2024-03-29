import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tokens } from '../theme/theme';

export default function UnderConstruction() {
	const { pallete } = useSelector(store => store.theme);
	const colors = tokens[pallete];
	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 4,
				backgroundColor: colors.grey[500],
				height: 350,
			}}
		>
			<Typography gutterBottom variant="h3">
				Page under construction...
			</Typography>

			<Divider />
			<Box display="flex" justifyContent="center" alignItems="center">
				<img
					alt="profile-user"
					width="200px"
					height="200px"
					src={`../../images/under-construction.png`}
					style={{ cursor: 'pointer', borderRadius: '50%' }}
				/>
			</Box>
			<Divider />
			<Button fullWidth component={Link} to="/dashboard" sx={{ backgroundColor: colors.grey[600], fontSize: 20 }}>
				Go to Dashboard
			</Button>
		</Container>
	);
}
