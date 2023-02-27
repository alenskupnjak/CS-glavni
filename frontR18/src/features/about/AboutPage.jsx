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
} from '@mui/material';
import { useState } from 'react';
import agent from '../../app/api/agent';

export default function AboutPage() {
	const [validationErrors, setValidationErrors] = useState([]);

	function getValidationError() {
		agent.TestErrors.getValidationError()
			.then(() => console.log('should not see this'))
			.catch(error => setValidationErrors(error));
	}

	console.log('%c 00 validationErrors ', 'color:red', validationErrors);

	return (
		<Container>
			<Typography gutterBottom variant="h2">
				Proba za greške
			</Typography>
			<ButtonGroup fullWidth>
				<Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>
					Test 400 Error
				</Button>
				<Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>
					Test 401 - Neautoriziran
				</Button>
				<Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>
					Test 404 Not found
				</Button>
				<Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>
					Test 500 Error
				</Button>
				<Button variant="contained" onClick={getValidationError}>
					Test Validation Error
				</Button>
			</ButtonGroup>
			{validationErrors.length > 0 && (
				<Alert severity="error">
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
		</Container>
	);
}
