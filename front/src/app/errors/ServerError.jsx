import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

export default function ServerError() {
	const history = useHistory();
	const { state } = useLocation();

	return (
		<Container component={Paper}>
			{state?.error ? (
				<React.Fragment>
					<Typography variant="h3" color="error" gutterBottom>
						{state.error.title}
					</Typography>
					<Divider />
					<Typography>{state.error.detail || 'Internal server error'}</Typography>
				</React.Fragment>
			) : (
				<Typography variant="h5" gutterBottom>
					Server Error
				</Typography>
			)}
			<Button onClick={() => history.push('/catalog')}>Go back to the store</Button>
		</Container>
	);
}
