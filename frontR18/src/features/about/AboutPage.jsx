import { useState } from 'react';
import {
	Alert,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
	Divider,
	Box,
} from '@mui/material';
import agent from '../../app/api/agent';
import { tokens } from '../../theme';

export default function AboutPage() {
	const [validationErrors, setValidationErrors] = useState([]);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	function getValidationError() {
		agent.TestErrors.getValidationError()
			.then(() => console.log('should not see this'))
			.catch(error => setValidationErrors(error));
	}

	return (
		<Container>
			<Typography gutterBottom variant="h2">
				Testing error, palette using
			</Typography>
			<ButtonGroup fullWidth>
				<Button
					variant="contained"
					sx={{ background: colors.greenAccent[600], fontSize: 13, color: colors.grey[400] }}
					onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}
				>
					Test 400 Error
				</Button>
				<Button
					sx={{ background: colors.greenAccent[400] }}
					variant="contained"
					onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}
				>
					Test 401 - Neautoriziran
				</Button>
				<Button
					sx={{ background: colors.greenAccent[600] }}
					variant="contained"
					onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}
				>
					Test 404 Not found
				</Button>
				<Button
					sx={{ background: colors.greenAccent[400] }}
					variant="contained"
					onClick={() => {
						setValidationErrors([]);
						agent.TestErrors.get500Error().catch(error => console.log(error));
					}}
				>
					Test 500 Error
				</Button>
				<Button sx={{ background: colors.redAccent[700] }} variant="contained" onClick={getValidationError}>
					Test Validation Error
				</Button>
			</ButtonGroup>
			{validationErrors.length > 0 && (
				<Alert severity="error" sx={{ background: colors.redAccent[600], fontSize: 13 }}>
					<AlertTitle>Validation Errors</AlertTitle>
					<List>
						{validationErrors.map(error => (
							<ListItem key={error}>
								<ListItemText>{error}</ListItemText>
							</ListItem>
						))}
					</List>
				</Alert>
			)}
			<Box sx={{ mt: 2, border: 2 }}>
				<Typography sx={{ background: colors.greenAccent[100], fontSize: 13 }}> greenAccent 100</Typography>
				<Typography sx={{ background: colors.greenAccent[200], fontSize: 13 }}> greenAccent 200</Typography>
				<Typography sx={{ background: colors.greenAccent[300], fontSize: 13 }}> greenAccent 300</Typography>
				<Typography sx={{ background: colors.greenAccent[400], fontSize: 13 }}> greenAccent 400</Typography>
				<Typography sx={{ background: colors.greenAccent[500], fontSize: 13 }}> greenAccent neutral</Typography>
				<Typography sx={{ background: colors.greenAccent[600], fontSize: 13 }}> greenAccent 600</Typography>
				<Typography sx={{ background: colors.greenAccent[700], fontSize: 13 }}> greenAccent 700</Typography>
				<Typography sx={{ background: colors.greenAccent[800], fontSize: 13 }}> greenAccent 800</Typography>
				<Typography sx={{ background: colors.greenAccent[900], fontSize: 13 }}> greenAccent 900</Typography>
				<Divider />
			</Box>
			<Box sx={{ mt: 2, border: 2 }}>
				<Typography sx={{ background: colors.grey[100], fontSize: 13 }}> grey 100</Typography>
				<Typography sx={{ background: colors.grey[200], fontSize: 13 }}> grey 200</Typography>
				<Typography sx={{ background: colors.grey[300], fontSize: 13 }}> grey 300</Typography>
				<Typography sx={{ background: colors.grey[400], fontSize: 13 }}> grey 400</Typography>
				<Typography sx={{ background: colors.grey[500], fontSize: 13 }}> grey neutral</Typography>
				<Typography sx={{ background: colors.grey[600], fontSize: 13 }}> grey 600</Typography>
				<Typography sx={{ background: colors.grey[700], fontSize: 13 }}> grey 700</Typography>
				<Typography sx={{ background: colors.grey[800], fontSize: 13 }}> grey 800</Typography>
				<Typography sx={{ background: colors.grey[900], fontSize: 13 }}> grey 900</Typography>
			</Box>
			<Box sx={{ mt: 2, border: 2 }}>
				<Typography sx={{ background: colors.primary[100], fontSize: 13 }}> primary 100</Typography>
				<Typography sx={{ background: colors.primary[200], fontSize: 13 }}> primary 200</Typography>
				<Typography sx={{ background: colors.primary[300], fontSize: 13 }}> primary 300</Typography>
				<Typography sx={{ background: colors.primary[400], fontSize: 13 }}> primary 400</Typography>
				<Typography sx={{ background: colors.primary[500], fontSize: 13 }}> primary neutral</Typography>
				<Typography sx={{ background: colors.primary[600], fontSize: 13 }}> primary 600</Typography>
				<Typography sx={{ background: colors.primary[700], fontSize: 13 }}> primary 700</Typography>
				<Typography sx={{ background: colors.primary[800], fontSize: 13 }}> primary 800</Typography>
				<Typography sx={{ background: colors.primary[900], fontSize: 13 }}> primary 900</Typography>
			</Box>
			<Box sx={{ mt: 2, border: 2 }}>
				<Typography sx={{ background: colors.redAccent[100], fontSize: 13 }}> redAccent 100</Typography>
				<Typography sx={{ background: colors.redAccent[200], fontSize: 13 }}> redAccent 200</Typography>
				<Typography sx={{ background: colors.redAccent[300], fontSize: 13 }}> redAccent 300</Typography>
				<Typography sx={{ background: colors.redAccent[400], fontSize: 13 }}> redAccent 400</Typography>
				<Typography sx={{ background: colors.redAccent[500], fontSize: 13 }}> redAccent neutral</Typography>
				<Typography sx={{ background: colors.redAccent[600], fontSize: 13 }}> redAccent 600</Typography>
				<Typography sx={{ background: colors.redAccent[700], fontSize: 13 }}> redAccent 700</Typography>
				<Typography sx={{ background: colors.redAccent[800], fontSize: 13 }}> redAccent 800</Typography>
				<Typography sx={{ background: colors.redAccent[900], fontSize: 13 }}> redAccent 900</Typography>
			</Box>
			<Box sx={{ mt: 2, border: 2 }}>
				<Typography sx={{ background: colors.blueAccent[100], fontSize: 13 }}> blueAccent 100</Typography>
				<Typography sx={{ background: colors.blueAccent[200], fontSize: 13 }}> blueAccent 200</Typography>
				<Typography sx={{ background: colors.blueAccent[300], fontSize: 13 }}> blueAccent 300</Typography>
				<Typography sx={{ background: colors.blueAccent[400], fontSize: 13 }}> blueAccent 400</Typography>
				<Typography sx={{ background: colors.blueAccent[500], fontSize: 13 }}> blueAccent neutral</Typography>
				<Typography sx={{ background: colors.blueAccent[600], fontSize: 13 }}> blueAccent 600</Typography>
				<Typography sx={{ background: colors.blueAccent[700], fontSize: 13 }}> blueAccent 700</Typography>
				<Typography sx={{ background: colors.blueAccent[800], fontSize: 13 }}> blueAccent 800</Typography>
				<Typography sx={{ background: colors.blueAccent[900], fontSize: 13 }}> blueAccent 900</Typography>
			</Box>
		</Container>
	);
}
