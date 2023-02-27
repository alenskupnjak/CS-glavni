import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary Review komponenta
			</Typography>
			<BasketTable isBasket={false} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
