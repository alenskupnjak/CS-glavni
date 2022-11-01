import { Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';
import React from 'react';

export default function ProductCardSkeleton() {
	return (
		<Grid item xs component={Card}>
			<CardHeader
				avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
				title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
			/>
			<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
			<CardContent>
				<React.Fragment>
					<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
					<Skeleton animation="wave" height={10} width="80%" />
				</React.Fragment>
			</CardContent>
			<CardActions>
				<React.Fragment>
					<Skeleton animation="wave" height={10} width="40%" />
					<Skeleton animation="wave" height={10} width="20%" />
				</React.Fragment>
			</CardActions>
		</Grid>
	);
}
