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
	Box,
} from '@mui/material';
import agent from '../../app/api/agent';
import { tokens } from '@app/theme/theme';
import { times } from 'lodash';

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
			<Box sx={{ mt: 1, border: 2 }}>
				{times(9, i => (
					<Typography key={i} sx={{ background: colors.greenAccent[(i + 1) * 100], fontSize: 13 }}>
						greenAccent {(i + 1) * 100} - {colors.greenAccent[(i + 1) * 100]}
					</Typography>
				))}
			</Box>
			<Box sx={{ mt: 1, border: 2 }}>
				{times(9, i => (
					<Typography key={i} sx={{ background: colors.grey[(i + 1) * 100], fontSize: 13 }}>
						grey {(i + 1) * 100} - {colors.grey[(i + 1) * 100]}
					</Typography>
				))}
			</Box>
			<Box sx={{ mt: 1, border: 2 }}>
				{times(9, i => (
					<Typography key={i} sx={{ background: colors.primary[(i + 1) * 100], fontSize: 13 }}>
						primary {(i + 1) * 100} - {colors.primary[(i + 1) * 100]}
					</Typography>
				))}
			</Box>
			<Box sx={{ mt: 1, border: 2 }}>
				{times(9, i => (
					<Typography key={i} sx={{ background: colors.redAccent[(i + 1) * 100], fontSize: 13 }}>
						redAccent {(i + 1) * 100} - {colors.redAccent[(i + 1) * 100]}
					</Typography>
				))}
			</Box>
			<Box sx={{ mt: 1, border: 2 }}>
				{times(9, i => (
					<Typography key={i} sx={{ background: colors.blueAccent[(i + 1) * 100], fontSize: 13 }}>
						blueAccent {(i + 1) * 100} - {colors.blueAccent[(i + 1) * 100]}
					</Typography>
				))}
			</Box>
		</Container>
	);
}
