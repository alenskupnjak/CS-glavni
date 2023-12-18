import React from 'react';
import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';

export default function ServerError() {
	const navigate = useNavigate();
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
				<Typography variant="h1" gutterBottom>
					Server Error
				</Typography>
			)}
			<Button variant="contained" style={{ color: 'yellow', fontSize: '20px' }} onClick={() => navigate('/')}>
				Go back to the store
			</Button>
		</Container>
	);
}
