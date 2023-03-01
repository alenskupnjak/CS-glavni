import { Button, Container, Divider, Paper, Typography, useTheme } from '@mui/material';

import { Link } from 'react-router-dom';
import { tokens } from '../theme/theme';

export default function NotFound() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
