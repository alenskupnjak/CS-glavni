import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function OrderDetailed({ order, setSelectedOrder }) {
	const subtotal = order.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
	return (
		<React.Fragment>
			<Box display="flex" justifyContent="space-between">
				<Typography sx={{ p: 2 }} gutterBottom variant="h4">
					Order# {order.id} - {order.orderStatus}
				</Typography>
				<Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size="large" variant="contained">
					Back to orders
				</Button>
			</Box>
			<BasketTable items={order.orderItems} isBasket={false} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary subtotal={subtotal} />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
