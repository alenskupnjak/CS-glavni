import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { tokens } from '@app/theme/theme';

export default function NotFound() {
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
				Oops!
			</Typography>
			<Divider />
			<Typography gutterBottom sx={{ backgroundColor: colors.grey[600], fontSize: 40 }}>
				404
			</Typography>
			<Divider />
			<Typography gutterBottom sx={{ color: colors.greenAccent[600], fontSize: 30 }}>
				Oops! Page Not Found
			</Typography>
			<Divider />
			<Button
				fullWidth
				component={Link}
				to="/dashboard"
				sx={{ backgroundColor: colors.grey[600], fontSize: 20, mt: 5 }}
			>
				Go to Dashboard
			</Button>
		</Container>
	);
}
