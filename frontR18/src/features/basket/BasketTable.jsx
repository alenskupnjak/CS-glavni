import { Remove, Add, Delete } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { LoadingButton } from '@mui/lab';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Container,
	useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useStore } from '@app/stores/store';
import { tokens } from '@app/theme/theme';

function BasketTable({ isBasket = true }) {
	const theme = useTheme();
	const colors = tokens[theme.palette.mode];
	const { productStore } = useStore();
	const { basket, loading, productName, handleAddItem, handleRemoveItem } = productStore;

	return (
		<Container sx={{ mt: 6, background: colors.grey[500] }}>
			<TableContainer component={Paper} sx={{ background: colors.grey[500] }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket &&
							basket.items.map(item => {
								// console.log('%c 00 item ', 'color:gold', item);
								return (
									<TableRow
										key={item.productId}
										sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: colors.blueAccent[400] }}
									>
										<TableCell component="th" scope="row">
											<Box display="flex" alignItems="center">
												<img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
												<span>{item.name}</span>
											</Box>
										</TableCell>
										<TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
										<TableCell align="center">
											{isBasket && (
												<LoadingButton
													loading={loading && productName === 'rem' + item.productId}
													onClick={() => handleRemoveItem(item, 1, 'rem' + item.productId)}
													color="error"
												>
													<Remove />
												</LoadingButton>
											)}
											{item.quantity}
											{isBasket && (
												<LoadingButton
													loading={loading && productName === 'add' + item.productId}
													onClick={() => handleAddItem(item, 'add' + item.productId)}
													color="secondary"
												>
													<Add />
												</LoadingButton>
											)}
										</TableCell>
										<TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
										<TableCell align="right">
											{isBasket && (
												<LoadingButton
													loading={loading && productName === 'del' + item.productId}
													onClick={() => handleRemoveItem(item, item.quantity, 'del' + item.productId)}
													color="error"
												>
													<Delete />
												</LoadingButton>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default observer(BasketTable);
