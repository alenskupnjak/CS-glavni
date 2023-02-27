import React from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';

export default function ContactPage() {
	return (
		<React.Fragment>
			<Typography variant="h2">title</Typography>
			<Typography variant="h5">The data is: data</Typography>
			<ButtonGroup>
				<Button onClick={() => console.log('%c Decrement')} variant="contained" color="error">
					Decrement
				</Button>
				<Button onClick={() => console.log('%c Increment')} variant="contained" color="primary">
					Increment
				</Button>
				<Button onClick={() => console.log('%c Increment by 5')} variant="contained" color="secondary">
					Increment by 5
				</Button>
			</ButtonGroup>
		</React.Fragment>
	);
}
