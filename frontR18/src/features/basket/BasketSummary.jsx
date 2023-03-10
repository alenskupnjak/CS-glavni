import React from 'react';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useStore } from '@app/stores/store';
import { currencyFormat } from '../../@app/util/util';

export default function BasketSummary() {
	const { productStore } = useStore();
	const { basket } = productStore;
	const subtotal = basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
	const deliveryFee = subtotal > 10000 ? 0 : 500;

	return (
		<React.Fragment>
			<TableContainer component={Paper} variant={'outlined'}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">{currencyFormat(subtotal)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery fee*</TableCell>
							<TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}
